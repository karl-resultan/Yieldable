import {CropPestModel} from "./crop-pest.model";

export class CropModel {
  constructor(public id: number,
              public name: string,
              public image_url: string,
              public sci_name: string,
              public description: string,
              public cultivation: string,
              public season: string,
              public timeline: number,
              public crop_yield: number,
              public crop_price_national: number,
              public crop_price_local: number,
              public optimal_clay: number,
              public optimal_silt: number,
              public optimal_sand: number,
              public pest: CropPestModel[]
  ){}
}
