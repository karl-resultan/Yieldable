import { Component, OnInit } from '@angular/core';
import {WeatherSlideService} from "../weather-slide/weather-slide.service";
import {WeatherModel} from "../weather-slide/weather.model";
import { Chart, LineElement, PointElement, LineController, LinearScale, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip} from 'chart.js';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.scss'],
})
export class WeatherGraphComponent implements OnInit {
  weather_updates: WeatherModel[] = [];
  most_freq: string = '';
  dates: any[] = [];
  temps: any[] = [];

  url: string = 'http://127.0.0.1:8000/daily_weather';
  freq_url: string = 'http://127.0.0.1:8000/most_frequent';
  forecast_url: string = 'http://127.0.0.1:8000/get_forecast';


  constructor(public http: HttpClient) {
    Chart.register(BarElement, LineElement, PointElement, LineController, LinearScale, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
  }

  ngOnInit() {
    this.getWeatherData();

    this.http.get(this.freq_url).subscribe((response: any) => {
        this.most_freq = response.most_frequent;
    })

    this.http.get(this.forecast_url).subscribe((response: any) => {
      for (let forecast of response.forecast){
        let date = forecast.date.substring(0, 10);
        let temp = forecast.temperature_2m;

        this.dates.push(date);
        this.temps.push(temp);
      }
    })

    console.log(this.dates);
    console.log(this.temps);

    let ctx = <HTMLCanvasElement>document.getElementById('myChart');

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [{
          label: 'Temperature',
          data: this.temps,
          borderWidth: 1,
          backgroundColor: 'rgba(1, 1, 1, .8)',
          pointBackgroundColor: 'white'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getWeatherData(){
    this.weather_updates = [];

    this.http.get(this.url).subscribe((response: any) => {
      for (let data of response.weather_data) {
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
