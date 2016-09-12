//
//  CDVWxpay.h
//  cordova-plugin-wxpay
//
//  Created by tong.wu on 06/30/15.
//
//

#import "CDVPlugin.h"
#import "WXApi.h"
#import "WXApiObject.h"


@interface CDVWxpay:CDVPlugin <WXApiDelegate>

@property (nonatomic, strong) NSString *wechatAppId;

- (void)payment:(CDVInvokedUrlCommand *)command;
+ (CDVWxpay *)getInstance;

@end