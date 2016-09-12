/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


#import "AppDelegate.h"
#import "IQKeyboardManager.h"
#import "RCTSplashScreen.h"
#import "RCTUpdate.h"
#import "CDVWxpay.h"
#import <AlipaySDK/AlipaySDK.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //设置键盘遮挡
  IQKeyboardManager *manager = [IQKeyboardManager sharedManager];
  //开启，默认为YES
  manager.enable = YES;
  //控制点击背景是否收起键盘，默认为NO
  manager.shouldResignOnTouchOutside = YES;
  //控制键盘上的工具条文字颜色是否用户自定义
  manager.shouldToolbarUsesTextFieldTintColor = YES;
  //控制是否显示键盘上的工具条，默认为YES
  manager.enableAutoToolbar = NO;
  //是否显示Placeholder，默认为YES
  manager.shouldShowTextFieldPlaceholder = YES;
  //设置顺序为按照位置
  manager.toolbarManageBehaviour = IQAutoToolbarByPosition;
  
  NSLog(@"%@", [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0]stringByAppendingString:@"/"]);
#ifdef DEBUG
  NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
#else //DEBUG
  NSURL *jsCodeLocation = [RCTUpdate getBundleUrl];
#endif //DEBUG
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"JFBSample"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  [RCTSplashScreen show:rootView];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

// repost all remote and local notification using the default NSNotificationCenter so multiple plugins may respond
- (void)            application:(UIApplication*)application
    didReceiveLocalNotification:(UILocalNotification*)notification
{
  // re-post ( broadcast )
  [[NSNotificationCenter defaultCenter] postNotificationName:@"CDVLocalNotification" object:notification];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  if ([@"wx18d0597c9febcd0d" isEqualToString:url.scheme]) {
     return [WXApi handleOpenURL:url delegate:[CDVWxpay getInstance]];
  } else if ([@"a2088021939773980" isEqualToString:url.scheme]) {
    [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
    }];
  }
  return YES;
}

@end
