import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: string = undefined;

  video: any = undefined;
  email: string = "";
  disabled: boolean;

  constructor(private videoService: VideoService) { }





  ngOnInit() {

    this.video = this.videoService.getVideos().length;
   
    
  }


}
