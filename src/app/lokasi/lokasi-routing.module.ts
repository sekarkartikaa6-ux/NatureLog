import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LokasiPage } from './lokasi.page';
const routes: Routes = [{ path: '', component: LokasiPage }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LokasiRoutingModule {}
