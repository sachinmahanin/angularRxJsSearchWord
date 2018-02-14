import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule ,JsonpModule} from '@angular/http';
import { AppComponent } from './app.component';
 
import { SearchService } from './core/search.service';
  
import { GoogleAutocompleteService } from './core/googleAutocomplete.servise';


import { WordSearchComponent } from './search/word-search.component'
 
 @NgModule({
    declarations: [
     AppComponent,WordSearchComponent  
    ],
    imports: [                            
      BrowserModule,
      FormsModule,
     HttpModule ,
     JsonpModule,
     ReactiveFormsModule
        ],
   providers: [SearchService,GoogleAutocompleteService],
    bootstrap: [AppComponent]
 })
 export class AppModule { }
