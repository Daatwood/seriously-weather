import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.css']
})
export class QuoteComponent{
    public quote: Quote;
    public fetchingQuote: boolean;
    public message: string = "";

    constructor(private http: Http){}

    public getQuote(){
        this.fetchingQuote = true;
        this.message = "";
        this.http.get('/api/quote/random/').subscribe(result => {
            this.quote = result.json();
            this.fetchingQuote = false;
        }, error => this.handleError(error));
    }

    handleError(error: string){
        this.fetchingQuote = false;
        this.message = "Uh oh! An error occurred fetching quote.";
        console.error('Boom... '+error);
    }

}

interface Quote {
    quote: string;
    author: string;
    link: string;
}