import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Cour } from 'src/app/interfaces/cour';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: string = undefined;

  tuto: any = undefined;
  tutoLength: Observable<Cour>;
  email: string = "";
  disabled: boolean;



  constructor(private videoService: VideoService, private platform: Platform, private storage: NativeStorage) { }




  ngOnInit() {
  }

  async ionViewWillEnter(){
    if (this.platform.is("desktop")) {
      this.email = await localStorage.getItem('user');
    } else {
      this.email = await this.storage.getItem('user')
      
    }
    

    this.tuto = await this.videoService.getTutoByUser(this.email);
   
    this.tutoLength = await this.tuto.length
  }

}
