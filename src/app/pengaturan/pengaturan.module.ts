import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PengaturanRoutingModule } from './pengaturan-routing.module';
import { PengaturanPage } from './pengaturan.page';

@NgModule({
  imports: [CommonModule, IonicModule, PengaturanRoutingModule],
  declarations: [PengaturanPage]
})
export class PengaturanPageModule {}
