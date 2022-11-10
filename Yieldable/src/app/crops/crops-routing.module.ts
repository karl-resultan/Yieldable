import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropsPage } from './crops.page';

const routes: Routes = [
  {
    path: '',
    component: CropsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropsPageRoutingModule {}
