#import "CDVPlugin.h"

@interface AlipayPlugin : CDVPlugin

@property(nonatomic,strong)NSString *partner;
@property(nonatomic,strong)NSString *seller;
@property(nonatomic,strong)NSString *privateKey;
@property(nonatomic,strong)CDVInvokedUrlCommand *currentCallbackId;

- (void) pay:(CDVInvokedUrlCommand*)command;
@end
