import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PencarianRoutingModule } from './pencarian-routing.module';
import { PencarianPage } from './pencarian.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PencarianRoutingModule],
  declarations: [PencarianPage]
})
export class PencarianPageModule {}
