import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropPageRoutingModule } from './crop-routing.module';

import { CropPage } from './crop.page';
import { SoilSlideComponent } from "./slides/soil-slide/soil-slide.component";
import { WeatherSlideComponent } from "./slides/weather-slide/weather-slide.component";
import {CultivationSlideComponent} from "./slides/cultivation-slide/cultivation-slide.component";
import {ValueSlideComponent} from "./slides/value-slide/value-slide.component";
import { SwiperModule } from "swiper/angular";
import {PestSlideComponent} from "./slides/pest-slide/pest-slide.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropPageRoutingModule,
    SwiperModule
  ],
  declarations: [CropPage, SoilSlideComponent, WeatherSlideComponent, CultivationSlideComponent, ValueSlideComponent, PestSlideComponent]
})
export class CropPageModule {}
