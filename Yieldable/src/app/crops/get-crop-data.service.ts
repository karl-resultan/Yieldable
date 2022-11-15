import { Injectable } from '@angular/core';
import { CropModel } from "../crop/crop.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetCropDataService {
  allCrops: CropModel[] = [];
  url: string = 'http://127.0.0.1:8000/';

  constructor(public http: HttpClient) { }

  retrieveAllCropData(){
    this.http.get(this.url).subscribe((response: any) => {
      for (let data of response.crop_data){
        let newCrop = new CropModel(
          data.id,
          data.crop_name,
          data.crop_sci_name,
          data.crop_description,
          data.crop_cultivation,
          data.crop_season,
          data.crop_growth_timeline
        )

        this.allCrops.push(newCrop);
      }
    })

    return this.allCrops;
  }
}
