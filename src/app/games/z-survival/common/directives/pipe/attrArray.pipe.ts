import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attrArray'
})
export class AttrArrayPipe implements PipeTransform {
  transform(attrs: any): any {
    let result = [];
    for(let key in attrs) {
      if(key!=='id') {
        result.push({'key': key, 'value': attrs[key]});
      }
    }
    return result;
  }
}
