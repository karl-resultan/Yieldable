import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WeatherModel} from "./weather.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherSlideService {
  weather_updates: WeatherModel[] = [];
  url: string = 'http://127.0.0.1:8000/daily_weather';

  constructor(private http: HttpClient) { }

  getWeatherData(){
    this.weather_updates = [];

    this.http.get(this.url).subscribe((response: any) => {
      for (let data of response.weather_data){
        let temp = data.date;
        let month = '';
        let day = temp.substring(8, 10);

        switch (temp.substring(5, 7)) {
          case '01':
            month = 'January';
            break;
          case '02':
            month = 'February';
            break;
          case '03':
            month = 'March';
            break;
          case '04':
            month = 'April';
            break;
          case '05':
            month = 'May';
            break;
          case '06':
            month = 'June';
            break;
          case '07':
            month = 'July';
            break;
          case '08':
            month = 'August';
            break;
          case '09':
            month = 'September';
            break;
          case '10':
            month = 'October';
            break;

          case '11':
            month = 'November';
            break;

          case '12':
            month = 'December';
            break;
        }

        let newUpdate = new WeatherModel(
          month,
          day,
          data.location,
          data.weathercode,
          data.wmo,
          data.temperature_2m_max,
          data.temperature_2m_min,
          data.temperature_2m_mean,
          data.apparent_temperature_max,
          data.apparent_temperature_min,
          data.apparent_temperature_mean,
          data.sunrise,
          data.sunset,
          data.precipitation_sum,
          data.rain_sum,
          data.precipitation_hours,
          data.windspeed_10m_max,
          data.winddirection_10m_dominant
        )

        this.weather_updates.push(newUpdate)
      }
    })
  }
}
