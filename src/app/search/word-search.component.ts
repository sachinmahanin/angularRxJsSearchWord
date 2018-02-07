import { Component } from '@angular/core';
import { SearchService } from '../core/search.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
@Component({
  selector: 'word-search',
  templateUrl: 'wordSearch.component.html',
})
export class WordSearchComponent {

  term = new FormControl();

  constructor(private searchService: SearchService) { }

  items: Observable<Array<string>>;
  result: string[] = [];
  ngOnInit() {

    var combined = this.term.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((term) => {
        this.result = [];
        return this.searchService.search(term);
      });

     

      combined.subscribe(latestValues => {
        const [ response1 , response2 ] = latestValues;
        if(response1!="")
          this.result=this.result.concat(response1);
        if(response2!="")
           this.result=this.result.concat(response2);
        this.items = of(this.result);
    });
 

  }
}
