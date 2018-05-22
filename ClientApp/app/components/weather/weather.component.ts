import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { QuoteComponent } from './../quote/quote.component';

@Component({
    selector: 'weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
    public weather: Weather;
    public adjectives: string[];
    public prefix: string;
    public message: string;
    public location: Coordinates;
    public fetchingWeather: boolean;
    public isCelcius: boolean = false;
    public city: string;
    @ViewChild(QuoteComponent)
    set setQuote(quote: QuoteComponent){
        if (quote) quote.getQuote();
    }

    constructor(private http: Http){
        this.adjectives = ["Rediculous", "Serious", "Ambitious", "Glamorous", "Important", "Beautiful", "Peaceful", "Deafening", "Enthuastic", "Couragous", "Agreeable", "Considerate", "Aggressive"];
    }
   
    public getWeather(cityName: string){
        this.fetchingWeather = true;
        this.clearMessage();
        this.http.get('/api/weather/city/'+cityName).subscribe(result => {
            this.weather = result.json();
            this.prefix = this.randomPrefix();
            this.fetchingWeather = false;
        }, error => this.handleError(error, cityName));
    }

    public getGeolocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
            this.location = position.coords;
            console.log(position.coords); 
            });
        }
    }

    public clearMessage(){
        this.message = "";
    } 

    public formattedWeather(tempString: string){
        let temp = (this.isCelcius ? this.toCelcius(Number(tempString)) : Number(tempString));
        return temp.toFixed(1) + "° " + (this.isCelcius ? 'C' : 'F');
    }

    toCelcius(temp: number) {
        return ((temp - 32) * 5/9);
    }

    handleError(error: string, cityName: string){
        this.fetchingWeather = false;
        this.message = "Uh oh! Trouble locating '"+cityName+"', Try something else.";
        console.error('Boom... '+error);
    }

    randomPrefix() {
        return this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
    }
}

interface Weather {
    temperature: string;
    high: string;
    low: string;
    iconUrl: string;
    humidity: string;
    summary: string;
    city: string;
    country: string;
    sunriseUTC: string;
    sunsetUTC: string;
}