//
//  CDVWxpay.m
//  cordova-plugin-wxpay
//
//  Created by tong.wu on 06/30/15.
//
//

#import "CDVWxpay.h"

static CDVWxpay *g_wxPay = nil;

@implementation CDVWxpay
@synthesize bridge = _bridge;

#pragma mark "API"

RCT_EXPORT_MODULE(WeixinPay)

RCT_EXPORT_CORDOVA_METHOD(payment);

- (id)init {
  self = [super init];
  if (self) {
    g_wxPay = self;
  }
  return self;
}

+ (CDVWxpay *)getInstance {
  return g_wxPay;
}


- (void)payment:(CDVInvokedUrlCommand *)command
{
    [self.commandDelegate runInBackground:^{
        // check arguments
        NSDictionary *params = [command.arguments objectAtIndex:0];
        if (!params)
        {
            [self failWithCallbackID:command.callbackId withMessage:@"参数格式错误"];
            return ;
        }
        
        NSString *appid = nil;
        NSString *noncestr = nil;
        NSString *package = nil;
        NSString *partnerid = nil;
        NSString *prepayid = nil;
        NSString *timestamp = nil;
        NSString *sign = nil;
        
        // check the params
        if (![params objectForKey:@"appid"])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"appid参数错误"];
            return ;
        }
        appid = [params objectForKey:@"appid"];
        self.wechatAppId = appid;

        if (![params objectForKey:@"noncestr"])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"noncestr参数错误"];
            return ;
        }
        noncestr = [params objectForKey:@"noncestr"];

        if (![params objectForKey:@"package"])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"package参数错误"];
            return ;
        }
        package = [params objectForKey:@"package"];

        if (![params objectForKey:@"partnerid"])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"partnerid参数错误"];
            return ;
        }
        partnerid = [params objectForKey:@"partnerid"];

        if (![params objectForKey:@"prepayid"])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"prepayid参数错误"];
            return ;
        }
        prepayid = [params objectForKey:@"prepayid"];

        if (![params objectForKey:@"timestamp"])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"timestamp参数错误"];
            return ;
        }
        timestamp = [params objectForKey:@"timestamp"];

        if (![params objectForKey:@"sign"])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"sign参数错误"];
            return ;
        }
        sign = [params objectForKey:@"sign"];

        // 向微信注册
        [WXApi registerApp:appid];
        
        if (![WXApi isWXAppInstalled]) {
            [self failWithCallbackID:command.callbackId withMessage:@"未安装微信"];
            return;
        }
    
        PayReq *req = [[PayReq alloc] init];
        req.openID = appid;
        req.partnerId = partnerid;
        req.prepayId = prepayid;
        req.nonceStr = noncestr;
        req.timeStamp = timestamp.intValue;
        req.package = package;
        req.sign = sign;

        [WXApi sendReq:req];
        //日志输出
        NSLog(@"\nappid=%@\npartid=%@\nprepayid=%@\nnoncestr=%@\ntimestamp=%ld\npackage=%@\nsign=%@",req.openID,req.partnerId,req.prepayId,req.nonceStr,(long)req.timeStamp,req.package,req.sign );

        
        CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"调起成功"];
        
        [self.commandDelegate sendPluginResult:commandResult callbackId:command.callbackId];
    }];
}

#pragma mark "WXApiDelegate"

/**
 * Not implemented
 */
- (void)onReq:(BaseReq *)req
{
    NSLog(@"%@", req);
}

- (void)onResp:(BaseResp *)resp
{
    BOOL success = NO;
    NSString *message = @"Unknown";
    
    switch (resp.errCode)
    {
        case WXSuccess:
            success = YES;
            break;
            
        case WXErrCodeCommon:
            message = @"普通错误类型";
            break;
            
        case WXErrCodeUserCancel:
            message = @"用户点击取消并返回";
            break;
            
        case WXErrCodeSentFail:
            message = @"发送失败";
            break;
            
        case WXErrCodeAuthDeny:
            message = @"授权失败";
            break;
            
        case WXErrCodeUnsupport:
            message = @"微信不支持";
            break;
    }
  
    NSMutableDictionary * resultDic= [[NSMutableDictionary alloc]init];
    [resultDic setObject: [NSNumber numberWithInt: resp.errCode] forKey: @"errCode"];
    if (success)
    {
        if ([resp isKindOfClass:[PayResp class]])
        {
          [resultDic setObject: resp.errStr?resp.errStr:@"无错误字符串" forKey: @"errStr"];
            [resultDic setObject: @"true" forKey: @"success"];
        }
        else
        {
          [resultDic setObject: @"回调不是支付类型" forKey: @"errStr"];
          [resultDic setObject: @"false" forKey: @"success"];
        }
    }
    else
    {
      [resultDic setObject: message forKey: @"errStr"];
      [resultDic setObject: @"false" forKey: @"success"];
    }
    
  [self.bridge.eventDispatcher sendAppEventWithName:@"WEIXIN_PAY" body:resultDic];
}

#pragma mark "CDVPlugin Overrides"

- (void)handleOpenURL:(NSNotification *)notification
{
    NSURL* url = [notification object];
    
    if ([url isKindOfClass:[NSURL class]] && [url.scheme isEqualToString:self.wechatAppId])
    {
        [WXApi handleOpenURL:url delegate:self];
    }
}

#pragma mark "Private methods"

- (NSData *)getNSDataFromURL:(NSString *)url
{
    NSData *data = nil;
    
    if ([url hasPrefix:@"http://"] || [url hasPrefix:@"https://"])
    {
        data = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
    }else if([url containsString:@"temp:"]){
        url =  [NSTemporaryDirectory() stringByAppendingPathComponent:[url componentsSeparatedByString:@"temp:"][1]];
        data = [NSData dataWithContentsOfFile:url];
    }
    else
    {
        // local file
        url = [[NSBundle mainBundle] pathForResource:[url stringByDeletingPathExtension] ofType:[url pathExtension]];
        data = [NSData dataWithContentsOfFile:url];
    }
    
    return data;
}

- (UIImage *)getUIImageFromURL:(NSString *)url
{
    NSData *data = [self getNSDataFromURL:url];
    return [UIImage imageWithData:data];
}

- (void)successWithCallbackID:(CDVInvokedUrlCommand *)callbackID
{
    [self successWithCallbackID:callbackID withMessage:@"OK"];
}

- (void)successWithCallbackID:(CDVInvokedUrlCommand *)callbackID withMessage:(NSString *)message
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
    [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
}

- (void)failWithCallbackID:(CDVInvokedUrlCommand *)callbackID withError:(NSError *)error
{
    [self failWithCallbackID:callbackID withMessage:[error localizedDescription]];
}

- (void)failWithCallbackID:(CDVInvokedUrlCommand *)callbackID withMessage:(NSString *)message
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:message];
    [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
}

@end