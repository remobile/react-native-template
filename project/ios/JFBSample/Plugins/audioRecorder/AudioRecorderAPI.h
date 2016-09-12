#import "CDVPlugin.h"
#import <AVFoundation/AVFoundation.h>

@interface AudioRecorderAPI : CDVPlugin<AVAudioRecorderDelegate, AVAudioPlayerDelegate> {
  NSString *recorderFilePath;
  AVAudioRecorder *recorder;
  AVAudioPlayer *player;
  CDVPluginResult *pluginResult;
  CDVInvokedUrlCommand *_command;
}

- (void)record:(CDVInvokedUrlCommand*)command;
- (void)stop:(CDVInvokedUrlCommand*)command;
- (void)playback:(CDVInvokedUrlCommand*)command;

@end
