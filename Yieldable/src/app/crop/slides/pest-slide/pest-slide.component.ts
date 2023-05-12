import {Component, Input, OnInit} from '@angular/core';
import {CropPestModel} from "../../crop-pest.model";

@Component({
  selector: 'app-pest-slide',
  templateUrl: './pest-slide.component.html',
  styleUrls: ['./pest-slide.component.scss'],
})
export class PestSlideComponent implements OnInit {
  path: string = 'http://127.0.0.1:8000/';
  @Input() pests: CropPestModel[] = [];

  constructor() { }

  ngOnInit() {}

  getPestImage(name: string){
    return `${this.path}pest/pestimg/${name}`
  }
}
