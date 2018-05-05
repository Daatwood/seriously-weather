/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { QuoteComponent } from './quote.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

let fixture: ComponentFixture<QuoteComponent>;

describe('Quote component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [QuoteComponent] });
        fixture = TestBed.createComponent(QuoteComponent);
        fixture.detectChanges();
    });


});
