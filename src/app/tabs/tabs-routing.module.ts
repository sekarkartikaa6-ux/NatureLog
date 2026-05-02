import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
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
        path: 'pencarian',
        loadChildren: () => import('../pencarian/pencarian.module').then(m => m.PencarianPageModule)
      },
      {
        path: 'pengaturan',
        loadChildren: () => import('../pengaturan/pengaturan.module').then(m => m.PengaturanPageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
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
