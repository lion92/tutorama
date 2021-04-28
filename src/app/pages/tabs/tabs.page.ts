import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: string = undefined;

  video: any = undefined;
  videoLength: number;
  email: string = "";
  disabled: boolean;

  constructor(private videoService: VideoService, private platform: Platform, private storage: NativeStorage) { }





  async ngOnInit() {

    if (this.platform.is("desktop")) {
      this.email = await localStorage.getItem('user');
    } else {
      this.email = await this.storage.getItem('user')
      
    }

    this.video = await this.videoService.getTutoByUser(this.email);
   
    this.videoLength = await this.video.length
  }


}
