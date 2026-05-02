import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TambahPage } from './tambah.page';
const routes: Routes = [{ path: '', component: TambahPage }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TambahRoutingModule {}
