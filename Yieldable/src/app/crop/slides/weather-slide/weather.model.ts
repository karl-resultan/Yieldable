export class WeatherModel {
  constructor(
    public month: string,
    public day: string,
    public location: string,
    public weathercode: number,
    public wmo: string,
    public temperature_2m_max: number,
    public temperature_2m_min: number,
    public temperature_2m_mean: number,
    public apparent_temperature_max: number,
    public apparent_temperature_min: number,
    public apparent_temperature_mean: number,
    public sunrise: string,
    public sunset: string,
    public precipitation_sum: number,
    public rain_sum: number,
    public precipitation_hours: number,
    public windspeed_10m_max: number,
    public winddirection_10m_dominant: number
  ){}
}
