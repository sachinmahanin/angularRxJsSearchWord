import { ISearchService } from '../shared/interfaces';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Jsonp, Response } from '@angular/http';
import { identifierModuleUrl } from '@angular/compiler';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
@Injectable()
export class GoogleAutocompleteService
{
       constructor(private jsonp: Jsonp) { }


    fetchData(term: string) {

        var googleSearchUrl = 'http://suggestqueries.google.com/complete/search?callback=JSONP_CALLBACK';

        var search = new URLSearchParams()
        
        search.set('q', term);
        search.set('output', 'firefox');
        search.set('hl', 'en');
       
             var googleSearchObserver = this.jsonp
            .request(googleSearchUrl, { search })
            .map((request) => {
                
                return request.json()[1];
            }
        );

         return googleSearchObserver;
            
       }

    private handleError(error: any) {
        console.error('Server Error :', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;

            }
            catch (err) {
                errMessage = error.statusText;
            }
            console.log(errMessage, error)

        }
        return of({});
    }

}  