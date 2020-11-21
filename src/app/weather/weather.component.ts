import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { WeatherServiceService } from '../weather-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  title = 'Weather';
  lati: number;
  longi: number;
  city: Object;
  temp: Object;
  humidity: Object;
  currentdate_time: string;
  constructor(private ws: WeatherServiceService, private http: HttpClient) {
    setInterval(() => {
      let date = new Date();
      this.currentdate_time = date.toDateString() + "  " + date.toLocaleTimeString()
    }, 1000)
  }

  ngOnInit() {
    const self = this;
    if (!navigator.geolocation) {
      alert("GeoLocation not supported in Browser")
    }
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.lati = position.coords.latitude;
      this.longi = position.coords.longitude;
      const timer= interval(2000);
      const resCall = self.http.get('https://api.openweathermap.org/data/2.5/weather?lat=' + this.lati + '&lon=' + this.longi + '&appid=43e3aca1566191fd66abf46c8be3017c');
      
      resCall.subscribe((res: any) => {
        console.log(res)
        this.city = res.name;
        this.temp = res.main.temp - 273.15;
        this.humidity = res.main.humidity;

      })
    });


  }

}
