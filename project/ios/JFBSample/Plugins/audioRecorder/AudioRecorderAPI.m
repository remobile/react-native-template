#import "AudioRecorderAPI.h"

@implementation AudioRecorderAPI

#define RECORDINGS_FOLDER [NSHomeDirectory() stringByAppendingPathComponent:@"Document"]

RCT_EXPORT_MODULE(AudioRecorder)

RCT_EXPORT_CORDOVA_METHOD(record);
RCT_EXPORT_CORDOVA_METHOD(stop);
RCT_EXPORT_CORDOVA_METHOD(playback);
RCT_EXPORT_CORDOVA_METHOD(playStop);

- (void)record:(CDVInvokedUrlCommand*)command {
  _command = command;
  recorderFilePath = [_command.arguments objectAtIndex:0];

  [self.commandDelegate runInBackground:^{

    AVAudioSession *audioSession = [AVAudioSession sharedInstance];

    NSError *err;
    [audioSession setCategory:AVAudioSessionCategoryPlayAndRecord error:&err];
    if (err)
    {
      NSLog(@"%@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[[err userInfo] description]];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
    }
    err = nil;
    [audioSession setActive:YES error:&err];
    if (err)
    {
      NSLog(@"%@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[[err userInfo] description]];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
    }

    NSMutableDictionary *recordSettings = [[NSMutableDictionary alloc] init];
    [recordSettings setObject:[NSNumber numberWithInt: kAudioFormatMPEG4AAC] forKey: AVFormatIDKey];
    [recordSettings setObject:[NSNumber numberWithFloat:8000.0] forKey: AVSampleRateKey];
    [recordSettings setObject:[NSNumber numberWithInt:1] forKey:AVNumberOfChannelsKey];
    [recordSettings setObject:[NSNumber numberWithInt:12000] forKey:AVEncoderBitRateKey];
    [recordSettings setObject:[NSNumber numberWithInt:8] forKey:AVLinearPCMBitDepthKey];
    [recordSettings setObject:[NSNumber numberWithInt: AVAudioQualityLow] forKey: AVEncoderAudioQualityKey];

    if (![recorderFilePath length]) {
      // Create a new dated file
      NSString *uuid = [[NSUUID UUID] UUIDString];
      recorderFilePath = [NSString stringWithFormat:@"%@/%@.m4a", RECORDINGS_FOLDER, uuid];
      NSLog(@"recording file path: %@", recorderFilePath);
    }

    NSURL *url = [NSURL fileURLWithPath:recorderFilePath];
    err = nil;
    recorder = [[AVAudioRecorder alloc] initWithURL:url settings:recordSettings error:&err];
    if(!recorder){
      NSLog(@"recorder: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[[err userInfo] description]];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
      return;
    }

    [recorder setDelegate:self];

    if (![recorder prepareToRecord]) {
      NSLog(@"prepareToRecord failed");
      
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"prepareToRecord failed"];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
      return;
    }

    if (![recorder record]) {
      NSLog(@"recordForDuration failed");
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"recordForDuration failed"];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
      return;
    }
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:recorderFilePath];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
  }];
}

- (void)stop:(CDVInvokedUrlCommand*)command {
  _command = command;
  NSLog(@"stopRecording");
  [recorder stop];
  NSLog(@"stopped");
}

- (void)playback:(CDVInvokedUrlCommand*)command {
  _command = command;
  NSString* filePath = [_command.arguments objectAtIndex:0];
  [self.commandDelegate runInBackground:^{
    NSLog(@"recording playback");
    NSURL *url = [NSURL fileURLWithPath:filePath];
    NSError *err;
    player = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&err];
    player.numberOfLoops = 0;
    player.delegate = self;
    [player prepareToPlay];
    [player play];
    if (err) {
      NSLog(@"%@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[[err userInfo] description]];
      [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
    }
    NSLog(@"playing");
  }];
}

- (void)playStop:(CDVInvokedUrlCommand*)command {
  _command = command;
  [self.commandDelegate runInBackground:^{
    if ([player isPlaying]) {
      [player stop];
    }
  }];
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag {
  NSLog(@"audioPlayerDidFinishPlaying");
  pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"playbackComplete"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
}

- (void)audioRecorderDidFinishRecording:(AVAudioRecorder *)recorder successfully:(BOOL)flag {
  NSURL *url = [NSURL fileURLWithPath: recorderFilePath];
  NSError *err = nil;
  NSData *audioData = [NSData dataWithContentsOfFile:[url path] options: 0 error:&err];
  if(!audioData) {
    NSLog(@"audio data: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[[err userInfo] description]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
  } else {
    NSLog(@"recording saved: %@", recorderFilePath);
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:recorderFilePath];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_command.callbackId];
  }
}

@end
