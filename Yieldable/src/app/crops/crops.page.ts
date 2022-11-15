import { Component, OnInit } from '@angular/core';
import { GetCropDataService } from "./get-crop-data.service";
import {CropModel} from "../crop/crop.model";

@Component({
  selector: 'app-crops',
  templateUrl: './crops.page.html',
  styleUrls: ['./crops.page.scss'],
})
export class CropsPage implements OnInit {
  crops: CropModel[] = [];


  constructor(public cropService: GetCropDataService) { }

  ngOnInit() {
    this.crops = this.cropService.retrieveAllCropData();

    for(let i = 0; i < 20; i++){
      let testCrop = new CropModel(
        i,
        `Sample Crop ${i}`,
        'Test Name',
        'Test Desc',
        'Test Culti',
        'Test Season',
        125
      );

      this.crops.push(testCrop)
    }
  }

  navigateToCrop(cropName: number){
    console.log(`${cropName} works!`);
  }
}
