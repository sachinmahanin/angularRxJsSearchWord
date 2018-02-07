import { Observable } from "rxjs/Observable";

 
export interface ISearchService {
    
    fetchData(term: string):Observable<any>;
}
 
 