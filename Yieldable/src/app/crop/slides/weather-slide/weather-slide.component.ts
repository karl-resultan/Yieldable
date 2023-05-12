import { Component, OnInit } from '@angular/core';
import {WeatherModel} from "./weather.model";
import {WeatherSlideService} from "./weather-slide.service";

@Component({
  selector: 'app-weather-slide',
  templateUrl: './weather-slide.component.html',
  styleUrls: ['./weather-slide.component.scss'],
})
export class WeatherSlideComponent implements OnInit {
  weather_updates: WeatherModel[] = [];

  constructor(private weatherUpdate: WeatherSlideService) { }

  ngOnInit() {
    this.weatherUpdate.getWeatherData();
    this.weather_updates = this.weatherUpdate.weather_updates;
  }

}
