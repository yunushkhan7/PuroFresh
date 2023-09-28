import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dataFilter',
})

export class DataFilterPipe implements PipeTransform {

    //  transform(value: any[], term: string): any[] {
    //     // return value.filter((x:any) => x.name.toLowerCase().startsWith(term.toLowerCase()))
    //     return value.filter((x: any) => x.dono.startsWith(term.toLowerCase()) 
    //     || x.description.toLowerCase().startsWith(term.toLowerCase())
    // )};

    // transform(value: any, args?: any): any {
    //     if (!args) {
    //       return value;
    //     }
    //     return value.filter((val) => {
    //       let rVal = (val.dono.toLocaleLowerCase().includes(args)) || (val.pno.toLocaleLowerCase().includes(args))
    //       || (val.quality.toLocaleLowerCase().includes(args)) || (val.description.toLocaleLowerCase().includes(args))
    //       || (val.pono.toLocaleLowerCase().includes(args));
    //       return rVal;
    //     })
    //   }

      transform(value: any, filter: any, defaultFilter: boolean): any {
        if (!filter){
          return value;
        }
        if (!Array.isArray(value)){
          return value;
        }
        if (filter && Array.isArray(value)) {
          let filterKeys = Object.keys(filter);
          if (defaultFilter) {
            return value.filter(item =>
                filterKeys.reduce((x, keyName) =>
                    (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
          } else {
            return value.filter(item => {
              return filterKeys.some((keyName) => {
                return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
              });
            });
          }
        }
      }
  }

  //   transform(array: any[], query: string): any {
  //       if (query) {
  //           return _.filter(array, row => row.dono.searchTerm(query) > -1);
  //       }
  //       return array;
  //   }
  // }

    // transform(data: any[], searchTerm: string): any[] {
    //     if (!data) { return [];
    //     }
    //     searchTerm = searchTerm.toLowerCase();
    //     return data.filter(item => {
    //       return item.indexOf(searchTerm) !== -1});
    //   }

    // transform(items: any[], filterQuery: any): any[] {
    //     if (!filterQuery) {
    //         return items;
    //     }
    //     return items.filter(item => item.whateverProperty.includes(filterQuery.toLowerCase()));
    //   }
