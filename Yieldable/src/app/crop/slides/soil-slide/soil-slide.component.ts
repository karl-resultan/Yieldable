import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {GetCropDataService} from "../../../crops/get-crop-data.service";
import {CropModel} from "../../crop.model";

@Component({
  selector: 'app-soil-slide',
  templateUrl: './soil-slide.component.html',
  styleUrls: ['./soil-slide.component.scss'],
})
export class SoilSlideComponent implements OnInit {
  @Input() crop: CropModel;
  @Output() newYield = new EventEmitter<number>();
  clay: number = 0;
  silt: number = 0;
  sand: number = 0;
  max1: number;
  max2: number;
  max3: number;

  constructor() { }

  ngOnInit() {
    this.clay = this.crop.optimal_clay;
    this.silt = this.crop.optimal_silt;
    this.sand = this.crop.optimal_sand;

    this.getMaxVals();
  }

  updateValues(soilType: string){
    let clay_amount = parseInt((<HTMLInputElement>document.getElementById('soil-1')).value);
    let silt_amount = parseInt((<HTMLInputElement>document.getElementById('soil-2')).value);
    let sand_amount = parseInt((<HTMLInputElement>document.getElementById('soil-3')).value);

    this.clay = clay_amount;
    this.silt = silt_amount;
    this.sand = sand_amount;

    let diff1 = this.getDiff(this.crop.optimal_clay, clay_amount);
    let diff2 = this.getDiff(this.crop.optimal_silt, silt_amount);
    let diff3 = this.getDiff(this.crop.optimal_sand, sand_amount);

    let calculation = this.crop.crop_yield - (this.crop.crop_yield * (((diff1) + (diff2) + (diff3)) / 100));

    if (calculation < 0){
      calculation = 0;
    }
    this.newYield.emit(parseFloat(calculation.toFixed(2)));
    this.getMaxVals();
  }

  getDiff(num1: number, num2: number){
    let res = 0;
    if (num1 > num2){
      res = num1 - num2;
    }
    else {
      res = num2 - num1;
    }

    return res;
  }

  getMaxVals(){
    this.max1 = 100 - (this.silt + this.sand);
    this.max2 = 100 - (this.clay + this.sand);
    this.max3 = 100 - (this.clay + this.silt);
  }
}
