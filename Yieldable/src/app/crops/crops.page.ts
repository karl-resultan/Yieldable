import { Component, OnInit } from '@angular/core';
import { GetCropDataService } from "./get-crop-data.service";
import {CropModel} from "../crop/crop.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-crops',
  templateUrl: './crops.page.html',
  styleUrls: ['./crops.page.scss'],
})
export class CropsPage implements OnInit {
  crops: CropModel[] = [];
  filtered_crops: CropModel[] = [];

  constructor(public cropService: GetCropDataService, public route: Router) { }

  async ngOnInit() {
    this.crops = this.cropService.retrieveAllCropData();
    this.filtered_crops = this.crops;
  }

  navigateToCrop(cropId: number){
    this.route.navigateByUrl(`crop/${cropId}`);
  }

  search(event){
    let crop_name = event.target.value;

    if (crop_name == ''){
      this.filtered_crops = this.crops;
    }
    else{
      this.filtered_crops = [];

      for (let crop of this.crops){
        if (crop.name.toUpperCase().includes(crop_name.toUpperCase())){
          this.filtered_crops.push(crop);
        }
      }
    }
  }
}
