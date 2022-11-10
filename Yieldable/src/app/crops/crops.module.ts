import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropsPageRoutingModule } from './crops-routing.module';

import { CropsPage } from './crops.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropsPageRoutingModule
  ],
  declarations: [CropsPage]
})
export class CropsPageModule {}
