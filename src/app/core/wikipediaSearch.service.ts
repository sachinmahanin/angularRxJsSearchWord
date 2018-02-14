import { ISearchService } from '../shared/interfaces';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Jsonp, Response } from '@angular/http';
import { identifierModuleUrl } from '@angular/compiler';
import { of } from 'rxjs/observable/of';
export class wikipediaSearch implements ISearchService {


    constructor(private jsonp: Jsonp) { }


    fetchData(term: string) {

        var wikipediaUrl = 'http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK';

        var search = new URLSearchParams()
        search.set('action', 'opensearch');
        search.set('search', term);
        search.set('format', 'json');

        return this.jsonp
            .get(wikipediaUrl, { search })
            .map((request) => request.json()[1]).catch(this.handleError);


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
          console.log(errMessage,error)
        
        }
        return of({});
      }
     
}  