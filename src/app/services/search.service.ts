import { Injectable } from "@angular/core";

export interface SearchSegment{
    value   : string;
    IsMatch : boolean;
}

@Injectable({
    providedIn: 'root'
})

export class SearchService{

    constructor(){

    }

    /**
        * @param  { string } a Request
        * @param  { string } b Compared string
        * const s { [replace], [insert], [remove] } = 1
        * @return { number } Levenstein distance
    **/

    public levensteinDistance( a : string, b : string ) : number {
        // a variables to keep lengths of words
        const len1 : number = a.length;
        const len2 : number = b.length;

        // matrix ( dynamic programming )
        const dp = new Array < number[] >( len2 + 1 );

        // initializing first row
        for(let i : number = 0; i < len1; ++i){
            dp[i] = new Array <number> ( len2 + 1 );
            dp[i][0] = i;
        }

        // initializing first column
        for(let i : number = 0; i < len2; ++i){
            dp[0][i] = i;
        }

        for(let i : number = 1; i < len1; ++i ){
            for( let j : number = 1; j < len2; ++j ){
                // if chars are equal, keep best option
                if( a[j - 1] == b[i - 1] ){
                    dp[i][j] = dp[i - 1][j - 1];
                } 
                // otherwise min of replacement, insertion, deletion + 1
                else {
                    dp[i][j] = Math.min( dp[i][j - 1] , dp[i - 1][j] , dp[i - 1][j - 1] ) + 1;
                }
            }
        }
        
        return dp[len1 - 1][len2 - 1];

    }


}