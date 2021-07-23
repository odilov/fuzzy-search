import { Component } from '@angular/core';
import { articles , IArticle } from './data/articles';
import { SearchService , SearchSegment } from './services/search.service';

/* structure to keep matches */
interface IMatch{
  value    : IArticle;
  score    : number;
  segments?: SearchSegment[];
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

  constructor( private searchService : SearchService ){
    // initialization
    this.request = "";
    this.matches = [];
  }

  public search(){
    if( !this.request ){
      this.matches = [];
      return;
    }

    this.matches = articles.map( ( article ) => {
        return ( { 
          value : article, 
          score : this.searchService.levensteinDistance( this.request, article.title )
        } );
    } )
    .sort( ( a, b ) => {
      return ( a.score >= b.score ? 1 : -1 );
    } );

  }

}
