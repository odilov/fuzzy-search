import { Component } from '@angular/core';

/* structure to keep matches */
interface IMatch{
  value : string;
  score : number;
  segment : any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'fuzzy-search';

  public request : string;

  public matches : IMatch[];

  constructor(){
    // initialization
    this.request = "";
    this.matches = [];
  }

  public search(){
    if( !this.request ){
      this.matches = [];
      return;
    }
  }

}
