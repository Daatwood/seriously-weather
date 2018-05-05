import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { QuoteComponent } from './../quote/quote.component';

@Component({
    selector: 'weather',
    template: require('./weather.component.html')
})
export class WeatherComponent {
    public weather: Weather;
    public adjectives: string[];
    public prefix: string;
    public message: string;
    private quoteComponent: QuoteComponent;
    @ViewChild(QuoteComponent)
    set setQuote(quote: QuoteComponent){
        if (quote) {
            quote.getQuote();
        }
        this.quoteComponent = quote;
    }

    constructor(private http: Http){
        this.adjectives = ["Rediculous", "Serious", "Ambitious", "Glamorous", "Important", "Beautiful", "Peaceful", "Deafening", "Enthuastic", "Couragous", "Agreeable", "Considerate", "Aggressive"];
    }
   
    public getWeather(cityName: string){
        this.http.get('/api/weather/city/'+cityName).subscribe(result => {
            this.weather = result.json();
            this.prefix = this.randomPrefix();
            if (this.quoteComponent) this.quoteComponent.getQuote();
        }, error => this.handleError(error, cityName));
    }

    public clearMessage(){
        this.message = "";
    } 

    handleError(error: string, cityName: string){
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
    humidity: string;
    summary: string;
    city: string;
    country: string;
    sunriseUTC: string;
    sunsetUTC: string;
}