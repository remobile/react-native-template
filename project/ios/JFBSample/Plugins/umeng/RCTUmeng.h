//
//  RCTUmeng.h
//  RCTUmeng
//
//  Created by fangyunjiang on 15/11/4.
//  Copyright (c) 2015年 remobile. All rights reserved.
//


#import "RCTBridgeModule.h"
#import "UMSocial.h"

#define UmengAppkey @"56da534be0f55ac3ad0008c4"

@interface RCTUmeng : NSObject <RCTBridgeModule, UMSocialUIDelegate>

@property (nonatomic, strong) RCTResponseSenderBlock callback;

-(void) shareToSns:(NSDictionary *)params callback:(RCTResponseSenderBlock)callback;
-(void) postSNSWithTypes:(NSArray *) type params:(NSDictionary *)params callback:(RCTResponseSenderBlock)callback;

@end
