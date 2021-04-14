import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from 'capacitor-video-player';
const { CapacitorVideoPlayer, Device } = Plugins;
import * as WebVPPlugin from 'capacitor-video-player';

const videoFrom:string = "http";

import { Component, AfterViewInit } from '@angular/core';



import { Video, VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.page.html',
  styleUrls: ['./tuto.page.scss'],
})
export class TutoPage implements AfterViewInit  {

  private url: string = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  private _url: string = null;
  private _videoPlayer: any;
  private _handlerPlay: any;
  private _handlerPause: any;
  videoPlayer: any;
  videos: Video[];

  constructor(private data: VideoService) {
    this.videos = data.getVidoes();
   }

   async ngOnInit() { 
    this._addListenersToPlayerPlugin();
   }

  //  async ionViewDidEnter() {
  //   this._url = this.url;
    
  //   if(this._url != null) {
      
  //     const res:any  = await this.videoPlayer.initPlayer({mode: "embedded",url: this._url, subtitle: "toto",
  //                                                         playerId: "fullscreen",
  //                                                         componentTag:"app-tuto"});
  //     console.log("res " + JSON.stringify(res));
       
  //     }
  //   }
  
    private _addListenersToPlayerPlugin() {
      this._handlerPlay = this._videoPlayer.addListener('jeepCapVideoPlayerPlay', (data:any) => { 
        console.log('Event jeepCapVideoPlayerPlay ', data);
        
      }, false);
      this._handlerPause = this._videoPlayer.addListener('jeepCapVideoPlayerPause', (data:any) => {
        console.log('Event jeepCapVideoPlayerPause ', data);
      }, false);
    }

   async ngAfterViewInit() {
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this.videoPlayer = CapacitorVideoPlayer;
    } else {
      this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
    }

  }

  async play(url: string) {
    
    const res:any  = await this.videoPlayer.initPlayer({mode: "fullscreen",
                                                        url: url, subtitle: "toto",
                                                        playerId: "fullscreen",
                                                        componentTag:"app-tuto"
                                                      });
  }

  

 

}
