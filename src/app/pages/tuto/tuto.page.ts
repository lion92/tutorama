import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from 'capacitor-video-player';
const { CapacitorVideoPlayer, Device } = Plugins;
import * as WebVPPlugin from 'capacitor-video-player';

const videoFrom:string = "http";

import { Component, AfterViewInit, OnInit } from '@angular/core';



import { Video, VideoService } from 'src/app/services/video.service';
import { Cour } from 'src/app/interfaces/cour';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.page.html',
  styleUrls: ['./tuto.page.scss'],
})
export class TutoPage implements AfterViewInit, OnInit  {

  private url: string = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  private _url: string = null;
  private _videoPlayer: any;
  private _handlerPlay: any;
  private _handlerPause: any;
  videoPlayer: any;
  videos: Video[];
  email: string;
  videoUser: Cour[] = [];

  constructor(private data: VideoService, private platform: Platform, private storage: NativeStorage) {
    //this.videos = data.getVideos();
   }

   async ngOnInit() { 

    if (this.platform.is("desktop")) {
      this.email = await localStorage.getItem('user');
    } else {
      this.email = await this.storage.getItem('user')
      
    }

     
     
       await this.data.getTutoByUser(this.email).then(async(data: any) => {
      
        this.videoUser = data;
        
       
        
       }).catch(async(err) => {
         console.log(err)
       }) 
    
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
