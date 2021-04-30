import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  close() {
    this.modal.dismiss({
        'dismissed': true
    });
  }
}
