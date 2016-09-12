#import "AlipayPlugin.h"
#import "Order.h"

#import "DataSigner.h"
#import <AlipaySDK/AlipaySDK.h>

@implementation AlipayPlugin


RCT_EXPORT_MODULE(AliPay)

RCT_EXPORT_CORDOVA_METHOD(pay);

- (void) pay:(CDVInvokedUrlCommand*)command
{
    self.currentCallbackId = command.callbackId;
    /*
     *生成订单信息及签名
     */
    
    //从API请求获取支付信息
    NSMutableDictionary *args = [command argumentAtIndex:0];
    NSString   *tradeId  = [args objectForKey:@"tradeNo"];
    NSString   *subject  = [args objectForKey:@"subject"];
    NSString   *body     = [args objectForKey:@"body"];
    NSString   *price    = [args objectForKey:@"price"];
    NSString   *notifyUrl    = [args objectForKey:@"notifyUrl"];
    
    self.partner = [args objectForKey:@"partner"];
    self.seller = [args objectForKey:@"seller"];
    self.privateKey = [args objectForKey:@"privateKey"];
    
    Order *order = [[Order alloc] init];
    order.partner = self.partner;
    order.seller = self.seller;
    order.tradeNO = tradeId; //订单ID（由商家自行制定）
    order.productName = subject; //商品标题
    order.productDescription = body; //商品描述
    order.amount = price; //商品价格
    order.notifyURL =  notifyUrl; //回调URL
    
    order.service = @"mobile.securitypay.pay";
    order.paymentType = @"1";
    order.inputCharset = @"utf-8";
    order.itBPay = @"30m";
    order.showUrl = @"m.alipay.com";
    
    //将商品信息拼接成字符串
    NSString *orderSpec = [order description];
    NSLog(@"orderSpec = %@",orderSpec);
    
    //获取私钥并将商户信息签名,外部商户可以根据情况存放私钥和签名,只需要遵循RSA签名规范,并将签名字符串base64编码和UrlEncode
    id<DataSigner> signer = CreateRSADataSigner(self.privateKey);
    NSString *signedString = [signer signString:orderSpec];
    
    //将签名成功字符串格式化为订单字符串,请严格按照该格式
    NSString *orderString = nil;
    if (signedString != nil) {
        orderString = [NSString stringWithFormat:@"%@&sign=\"%@\"&sign_type=\"%@\"",
                       orderSpec, signedString, @"RSA"];
        
        
        [[AlipaySDK defaultService] payOrder:orderString fromScheme:[NSString stringWithFormat:@"a%@", self.partner] callback:^(NSDictionary *resultDic) {
            if ([[resultDic objectForKey:@"resultStatus"]  isEqual: @"9000"]) {
                [self successWithCallbackID:self.currentCallbackId messageAsDictionary:resultDic];
            } else {
                [self failWithCallbackID:self.currentCallbackId messageAsDictionary:resultDic];
            }
            
            NSLog(@"reslut = %@",resultDic);
        }];
        
    }
}

- (void)handleOpenURL:(NSNotification *)notification
{
    NSURL* url = [notification object];
    
    if ([url isKindOfClass:[NSURL class]] && [url.scheme isEqualToString:[NSString stringWithFormat:@"a%@", self.partner]])
    {
        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            if ([[resultDic objectForKey:@"resultStatus"]  isEqual: @"9000"]) {
                [self successWithCallbackID:self.currentCallbackId messageAsDictionary:resultDic];
            } else {
                [self failWithCallbackID:self.currentCallbackId messageAsDictionary:resultDic];
            }
        }];
    }
}

- (void)successWithCallbackID:(CDVInvokedUrlCommand *)callbackID withMessage:(NSString *)message
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
    [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
}

- (void)failWithCallbackID:(CDVInvokedUrlCommand *)callbackID withMessage:(NSString *)message
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:message];
    [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
}
- (void)successWithCallbackID:(CDVInvokedUrlCommand *)callbackID messageAsDictionary:(NSDictionary *)message
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:message];
    [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
}

- (void)failWithCallbackID:(CDVInvokedUrlCommand *)callbackID messageAsDictionary:(NSDictionary *)message
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:message];
    [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
}

@end
