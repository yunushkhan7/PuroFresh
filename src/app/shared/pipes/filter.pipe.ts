import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({ name: 'filter' })
@Injectable()
export class ManualFilterPipe implements PipeTransform {

  transform(json: any[], args: any[]): any[] {
    const searchText = args[0];
    const jsonKey = args[1];
    let jsonKeyArray = [];

    if (searchText == null || searchText === 'undefined') { return json; }

    if (jsonKey.indexOf(',') > 0) {
        jsonKey.split(',').forEach( function(key) {
            jsonKeyArray.push(key.trim());
        });
    } else {
        jsonKeyArray.push(jsonKey.trim());
    }

    if (jsonKeyArray.length === 0) { return json; }

    // Start with new Array and push found objects onto it.
    let returnObjects = [];
    json.forEach( function ( filterObjectEntry ) {

        jsonKeyArray.forEach( function (jsonKeyValue) {
            if ( typeof filterObjectEntry[jsonKeyValue] !== 'undefined' &&
            filterObjectEntry[jsonKeyValue].toLowerCase().indexOf(searchText.toLowerCase()) > -1 ) {
                // object value contains the user provided text.
                returnObjects.push(filterObjectEntry);
                }
            });

    });
    return returnObjects;
  }
}