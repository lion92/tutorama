import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  close() {
    this.modal.dismiss({
        'dismissed': true
    });
  }

}
