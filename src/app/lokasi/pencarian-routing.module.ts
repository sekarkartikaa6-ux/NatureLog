import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PencarianPage } from './pencarian.page';
const routes: Routes = [{ path: '', component: PencarianPage }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PencarianRoutingModule {}
