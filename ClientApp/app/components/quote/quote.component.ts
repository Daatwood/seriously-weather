import { Component, OnChanges, Directive } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'quote',
    template: require('./quote.component.html'),
    styleUrls: ['./quote.component.css']
})
@Directive({selector: 'quote'})
export class QuoteComponent{
    public quote: Quote;
    public categories: string[];

    constructor(private http: Http){
        this.categories = ["funny", "inspire", "management", "sports", "life", "love", "art", "students"];
    }

    public getQuote(){
        this.http.get('/api/quote/random/').subscribe(result => {
            this.quote = result.json();
        }, error => console.error(error));
    }

    private randomCategory() {
        return this.categories[Math.floor(Math.random() * this.categories.length)];
    }

}

interface Quote {
    quote: string;
    author: string;
    link: string;
}