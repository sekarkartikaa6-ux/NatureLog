import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LokasiRoutingModule } from './lokasi-routing.module';
import { LokasiPage } from './lokasi.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LokasiRoutingModule],
  declarations: [LokasiPage]
})
export class LokasiPageModule {}
