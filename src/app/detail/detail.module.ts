import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailPage } from './detail.page';

@NgModule({
  imports: [CommonModule, IonicModule, DetailRoutingModule],
  declarations: [DetailPage]
})
export class DetailPageModule {}
