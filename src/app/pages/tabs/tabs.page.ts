import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: string = undefined;
  isButtonDisabled: boolean = true;
  video: any = undefined;

  constructor(private videoService: VideoService) { }





  ngOnInit() {

    this.video = this.videoService.getVidoes().length;
       
    
  }

}
