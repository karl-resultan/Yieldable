import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetCropDataService} from "../../../crops/get-crop-data.service";
import {CropModel} from "../../crop.model";

@Component({
  selector: 'app-cultivation-slide',
  templateUrl: './cultivation-slide.component.html',
  styleUrls: ['./cultivation-slide.component.scss'],
})
export class CultivationSlideComponent implements OnInit {
  cropId: number = 0;
  cropCultivation: CropModel;

  constructor(public route: ActivatedRoute, public cropData: GetCropDataService) { }

  async ngOnInit() {
    this.cropId = this.route.snapshot.params.id;
    this.cropCultivation = this.cropData.retrieveLocalCropData(this.cropId);

    let cultivation = this.cropCultivation.cultivation;
    let text_block: string = '';
    let sentenceCount: number = 0;

    let container = document.getElementById('cultivation-process');
    while (container.lastElementChild) {
      container.removeChild(container.lastElementChild);
    }

    for (let i = 0; i < cultivation.length; i++){
      text_block = text_block.concat(cultivation.charAt(i));

      if (cultivation.charAt(i) == '.'){
        sentenceCount++;

        if (sentenceCount == 2){
          let section = document.createElement('p');
          section.innerHTML = text_block;

          container.appendChild(section);
          text_block = '';
          sentenceCount = 0;
        }
      }
    }
  }

}
