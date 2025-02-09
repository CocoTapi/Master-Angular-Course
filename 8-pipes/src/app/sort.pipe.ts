import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  // false => will execute transform every time anything changed anywhere in that template
  pure: false
})
export class SortPipe implements PipeTransform {
  // LIMITATION: could mess up index
  // when the value changes, this code run again. but now is value is an array which is store as reference. 
  // 2 option, change function to make a new array, or set pure to false
  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    const sorted = [...value];

    sorted.sort((a, b) => {
      if (direction === 'asc'){
        return a > b ? 1 : -1;
      } else {
        return a > b ? -1 : 1;
      }
    });

    return sorted;
  }

}
