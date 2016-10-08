//
//  RCTDes.m
//  RCTDes
//
//  Created by fangyunjiang on 15/11/4.
//  Copyright (c) 2015年 remobile. All rights reserved.
//


#import "RCTDes.h"
#import "DesBase64.h"

@implementation RCTDes
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(encrypt:(NSString *)data key:(NSString *)key success:(RCTResponseSenderBlock)success error:(RCTResponseSenderBlock)error) {
    NSString *base64 = [DesBase64 encryptUseDES:data key:key];
    if (base64 == nil) {
        error(@[]);
    } else {
        success(@[base64]);
    }
}

RCT_EXPORT_METHOD(decrypt:(NSString *)base64 key:(NSString *)key success:(RCTResponseSenderBlock)success error:(RCTResponseSenderBlock)error) {
    NSString *data = [DesBase64 decryptUseDES:base64 key:key];
    if (data == nil) {
        error(@[]);
    } else {
        success(@[data]);
    }
}
@end
