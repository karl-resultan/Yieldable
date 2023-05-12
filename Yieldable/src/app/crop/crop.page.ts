import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CropModel} from "./crop.model";
import { GetCropDataService } from "../crops/get-crop-data.service";
import {ActivatedRoute} from "@angular/router";
import {IonSlides} from "@ionic/angular";

@Component({
  selector: 'app-crop',
  templateUrl: './crop.page.html',
  styleUrls: ['./crop.page.scss'],
})
export class CropPage implements OnInit {
  public yield: number;
  selectedCrop: CropModel;

  constructor(private cropService: GetCropDataService, private route: ActivatedRoute) { }

  async ngOnInit() {
    let cropID: number = this.route.snapshot.params.id;
    this.selectedCrop = this.cropService.retrieveLocalCropData(cropID);
    this.yield = this.selectedCrop.crop_yield;
  }

  onSoilChange($event: any){
    this.yield = $event;
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pagination : {
      el: '.swiper-pagination',
      clickable: true
    },
    allowTouchMove: false
  };
}
