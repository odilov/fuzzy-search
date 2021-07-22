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

}