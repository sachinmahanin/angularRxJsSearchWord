import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule ,JsonpModule} from '@angular/http';
import { AppComponent } from './app.component';
 
import { SearchService } from './core/search.service';

import { WordSearchComponent } from './search//word-search.component'
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
   providers: [SearchService],
    bootstrap: [AppComponent]
 })
 export class AppModule { }
