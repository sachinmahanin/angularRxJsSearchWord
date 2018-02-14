import { Component, ElementRef, OnInit } from '@angular/core';
import { SearchService } from '../core/search.service';
import { GoogleAutocompleteService } from '../core/googleAutocomplete.servise';
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
  host: {
    '(document:click)': 'handleClick($event)'
    }

})
export class WordSearchComponent {
  
  searchSummary:string = '';
  query: string = '';
  suggestionList: any[] = [];
  elementRef: ElementRef;
  pos: number = -1;
  term = new FormControl();
  constructor(private searchService: SearchService, private el: ElementRef, private autocompleteService: GoogleAutocompleteService) {
    this.elementRef = el;
  }

  items: Observable<Array<string>>;
  result: string[] = [];
  userStartedSeaching: boolean = false;
  ngOnInit() {

    var combined = this.term.valueChanges
      .debounceTime(2500)
      .distinctUntilChanged()
      .switchMap((term) => {
        if (term == "") {
          return of({});
        }
        return this.searchService.search(term);
      });


    combined.subscribe(latestValues => {
      var tempResult: string[] = [];
      //response1 & response2 will be undefined if user has not anything
      //service do not return anything or service will throw exception
      const [response1, response2] = latestValues;
      if (response1 != "" && typeof response1 != "undefined")
        tempResult = tempResult.concat(response1);
      if (response2 != "" && typeof response2 != "undefined")
        tempResult = tempResult.concat(response2);
      this.result = tempResult;
      if(tempResult.length==0 && this.query!="")
        this.searchSummary=" No results found :(";
      else
      this.searchSummary="";
      this.items = of(this.result);
    });




  }



  filterQuery() {

    var autocompleteObserver = this.autocompleteService.fetchData(this.query);
    autocompleteObserver.subscribe((data) => {
      let temp = [];

      if (data != "" && typeof data != "undefined" && Array.isArray(data)) {
        for (var num = 0; num < data.length; num++)
          temp.push({ id: num + 1, name: data[num] });

        this.suggestionList = temp;

      }

    });
  }

  filter(event: any) {


    //"Digit0" = 48 , Digit9=57
    //KeyA =65 ,KeyZ=90 ,Backspace key=8        
    if ((event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode == 8)) {
      this.suggestionList = [];
      this.pos = -1;
      this.filterQuery();
      for (let i = 0; i < this.suggestionList.length; i++) {
        this.suggestionList[i].selected = false;
      }
     
    }

    // Arrow-key Down
    if (event.keyCode == 40) {
      if (this.pos + 1 != this.suggestionList.length)
        this.pos++;
      if (this.suggestionList[this.pos] !== undefined) {
        if (this.suggestionList[this.pos - 1] !== undefined)
          this.suggestionList[this.pos - 1].selected = false;
        this.suggestionList[this.pos].selected = true;
      }
    }

    // Arrow-key Up
    if (event.keyCode == 38) {
      if (this.pos > 0)
        this.pos--;

      if (this.suggestionList[this.pos] !== undefined) {
        if (this.suggestionList[this.pos + 1] !== undefined)
          this.suggestionList[this.pos + 1].selected = false;
        this.suggestionList[this.pos].selected = true;
      }
    }


    //enter
    if (event.keyCode == 13) {
      if (this.suggestionList[this.pos] !== undefined) {
        this.select(this.suggestionList[this.pos]);
      }
      else
        this.suggestionList = [];
    }

    // Handle scroll position of item
    let listGroup = document.getElementById('list-group');
    let listItem = document.getElementById('true');
    if (listItem) {
      listGroup.scrollTop = (listItem.offsetTop - 200);
    }

  }

  select(item: any) {
    this.query = item.name;
    this.suggestionList = [];
  }



  handleKeyDown(event: any) {
    // Prevent default actions of arrows
    if (event.keyCode == 40 || event.keyCode == 38) {
      event.preventDefault();
    }
  }


  /** Handle outside click to close suggestions**/
  handleClick(event: any) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.suggestionList = [];

    }
  }
}
