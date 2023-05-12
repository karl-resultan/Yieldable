import { Injectable } from '@angular/core';
import { CropModel } from "../crop/crop.model";
import { HttpClient } from "@angular/common/http";
import {CropPestModel} from "../crop/crop-pest.model";

@Injectable({
  providedIn: 'root'
})
export class GetCropDataService {
  allCrops: CropModel[] = [];
  url: string = 'http://127.0.0.1:8000/';

  constructor(public http: HttpClient) { }

  retrieveLocalCropData(cropId: number){
    for (let crop of this.allCrops){
      if (crop.id == cropId){
        return crop;
      }
    }
  }

  retrieveAllCropData(){
    this.allCrops = [];

    this.http.get(this.url).subscribe((response: any) => {
      for (let data of response.crop_data){

        //PROCESSING CULTIVATION TEXT
        let temp: string = '';
        let sentenceEnd: number = 0;

        for (let i = 0; i < data.crop_cultivation.length; i++){
          temp = temp.concat(data.crop_cultivation.charAt(i));

          if (data.crop_cultivation.charAt(i) == '.'){
            sentenceEnd++;

            if (sentenceEnd == 2){
              temp = temp.concat('\n');
              sentenceEnd = 0;
            }
          }
        }

        let pestsList: CropPestModel[] = [];

        //CREATING AND ADDING CROP TO CROPS LIST
        let newCrop = new CropModel(
          data.id,
          data.crop_name,
          `${this.url}resources/${data.crop_name}`,
          data.crop_sci_name,
          data.crop_description,
          temp,
          data.crop_season,
          data.crop_growth_timeline,
          data.crop_optimal_yield,
          0,
          0,
          data.crop_optimal_clay,
          data.crop_optimal_silt,
          data.crop_optimal_sand,
          pestsList
        )

        this.http.get(`${this.url}price/${data.crop_name}`).subscribe((response: any) => {
          newCrop.crop_price_local = response.crop_value_local;
          newCrop.crop_price_national = response.crop_value_national;
        })

        this.http.get(`${this.url}pest/${data.crop_name}`).subscribe((response: any) => {
          for (let pest of response.pest_data){
            let newPest = new CropPestModel(
              pest.name,
              pest.species,
              pest.description,
              pest.measures
            );

            newCrop.pest.push(newPest);
          }
        })

        this.allCrops.push(newCrop);
      }
    })

    return this.allCrops;
  }
}
