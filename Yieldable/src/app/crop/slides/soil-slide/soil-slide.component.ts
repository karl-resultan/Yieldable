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

  updateValues(){
    //soil type
    let clay_amount = parseInt((<HTMLInputElement>document.getElementById('soil-1')).value);
    let silt_amount = parseInt((<HTMLInputElement>document.getElementById('soil-2')).value);
    let sand_amount = parseInt((<HTMLInputElement>document.getElementById('soil-3')).value);

    this.clay = clay_amount;
    this.silt = silt_amount;
    this.sand = sand_amount;

    let diff1 = this.getDiff(this.crop.optimal_clay, clay_amount);
    let diff2 = this.getDiff(this.crop.optimal_silt, silt_amount);
    let diff3 = this.getDiff(this.crop.optimal_sand, sand_amount);

    // macro nutrients
    let nitrogen = parseInt((<HTMLInputElement>document.getElementById('nitrogen')).value);
    let potassium = parseInt((<HTMLInputElement>document.getElementById('potassium')).value);
    let phosphorus = parseInt((<HTMLInputElement>document.getElementById('phosphorus')).value);

    // nutrient deficiency yield reduction calculation
    let yield_per_macronutrient = .39996 * this.crop.crop_yield;
    let yield_per_micronutrient = .095235 * this.crop.crop_yield;

    let reduction_per_nitrogen_deficiency = yield_per_macronutrient / 4.4;
    let reduction_per_potassium_deficiency = yield_per_macronutrient / 249.9;
    let reduction_per_phosphorus_deficiency = yield_per_macronutrient / 29.9;

    let nitrogen_deficit_yield, potassium_deficit_yield, phosphorus_deficit_yield = yield_per_macronutrient;

    if (nitrogen < 4.5 && nitrogen > 0) {
      nitrogen_deficit_yield = yield_per_macronutrient - ((4.4 - nitrogen) * reduction_per_nitrogen_deficiency);
    }
    if (potassium < 250 && potassium > 0) {
      potassium_deficit_yield = yield_per_macronutrient - ((249.9 - potassium) * reduction_per_potassium_deficiency);
    }
    if (phosphorus < 30 && phosphorus > 0) {
      phosphorus_deficit_yield = yield_per_macronutrient - ((29.9 - phosphorus) * reduction_per_phosphorus_deficiency);
    }

    let calculation = nitrogen_deficit_yield + potassium_deficit_yield + phosphorus_deficit_yield;

    // soil type yield reduction calculation
    calculation -= (calculation * (((diff1) + (diff2) + (diff3)) / 100));

    // prevent negative values
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
