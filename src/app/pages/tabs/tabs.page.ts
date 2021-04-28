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
  videoLength: number;
  email: string = "";
  disabled: boolean;

  constructor(private videoService: VideoService) { }





  async ngOnInit() {

    this.video = await this.videoService.getTutoByUser("florian_bracq@hotmail.fr");
   
    this.videoLength = this.video.length
  }


}
