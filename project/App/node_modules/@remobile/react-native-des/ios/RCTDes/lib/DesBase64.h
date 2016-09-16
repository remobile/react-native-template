//
//  DesBase64.h
//  Edu_tech
//
//  Created by fangyunjiang on 15/8/11.
//  Copyright (c) 2015年 gyyx. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DesBase64 : NSObject
+ (NSString *)encryptUseDES:(NSString *)clearText key:(NSString *)key;
+ (NSString*)decryptUseDES:(NSString*)cipherText key:(NSString*)key;

@end
