import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'lokasi',
        children: [
          {
            path: '',
            loadChildren: () => import('../lokasi/lokasi.module').then(m => m.LokasiPageModule)
          },
          {
            path: 'tambah',
            loadChildren: () => import('../tambah/tambah.module').then(m => m.TambahPageModule)
          },
          {
            path: 'detail/:id',
            loadChildren: () => import('../detail/detail.module').then(m => m.DetailPageModule)
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('../edit/edit.module').then(m => m.EditPageModule)
          }
        ]
      },
      {
        path: 'pengaturan',
        loadChildren: () => import('../pengaturan/pengaturan.module').then(m => m.PengaturanPageModule)
      },
      {
        path: '',
        redirectTo: 'lokasi',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
