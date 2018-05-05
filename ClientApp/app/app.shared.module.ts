import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { QuoteComponent } from './components/quote/quote.component';

@NgModule({
    declarations: [
        AppComponent,
        WeatherComponent,
        QuoteComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: WeatherComponent },
            { path: '**', redirectTo: '' }
        ])
    ]
})
export class AppModuleShared {
}
