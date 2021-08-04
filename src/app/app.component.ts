import { Component } from '@angular/core';
import { Games } from './data/games';
import { SearchService , IHighlight } from './services/search.service';

/* struct to keep the results of search with highlights */
interface IMatch{
  value    : string;
  score    : number;
  highlights: IHighlight[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'fuzzy-search';

  // a variable to keep input data
  public request : string;

  // an array to keep results 
  public matches : IMatch[];

  constructor( private searchService : SearchService ){
    // initialization
    this.request = "";
    this.matches = [];
  }

  // a function to search words and calculate scores
  public search(){

    // if input field is empty doen'S show anything

    if( !this.request ){
      this.matches = [];
      return;
    }


    // loop through all game names and map entry of games
    this.matches = Games.map( ( game ) => {
        // calculating the scores
        return ( { 
          value : game, 
          score : this.searchService.levensteinDistance( game ,  this.request)
        } );
    } )
    .sort( ( a, b ) => {
      // a comparator to display relevant results
      return ( a.score >= b.score ? 1 : -1 );
    } )
    .map( ( res )=> {
      // to display highlights
      return ({ 
        score : res.score,
        value: res.value,
        highlights: this.searchService.findIHighlight(  res.value , this.request )
       })
    } )
    .filter( ( match ) => {
      // by calculating the scores
      // the score value can be higher for some item without highlight matches
      // the function removes from result items with no match

      // a variable to track a match property
      let any_match : boolean = false;

      // loop through all highlights
      match.highlights.forEach( ( highlight ) => { 
        if( highlight.isMatch == true ){
          any_match = true;
        } 
      });
      return any_match;
    })
    // display only relevant data
    .slice( 0 , 10 );

  }

}
