import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user: string = undefined;
  isButtonDisabled: boolean = true;
  constructor() { }

  tabsEnabled = true;

  enableTabs(enable: boolean): void {
      this.tabsEnabled = enable;
  }

  ngOnInit() {

    
       
    this.user = localStorage.getItem('user')
    if(this.user){
      this.isButtonDisabled = false;
    }
  }

}
