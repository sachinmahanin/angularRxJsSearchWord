import { ISearchService } from '../shared/interfaces';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams, Jsonp, Response } from '@angular/http';
import { of } from 'rxjs/observable/of';

export class duckduckgoSearch implements ISearchService
 {

 
    constructor(private jsonp: Jsonp) { }
   
  
    fetchData(term: string)
    {
 
      var secondUrl='https://api.duckduckgo.com/?callback=JSONP_CALLBACK';
      var search = new URLSearchParams()
      search.set('q', term);
      search.set('format', 'json');
  
  
      var duckgoObserver = this.jsonp
        .request(secondUrl, { search })
        .map((request) => request.json())
        .map(item => {
          return item.AbstractURL;
        }).catch(this.handleError);
  
        return duckgoObserver;
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