import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avrageOfArray',
})
export class AvrageOfArrayPipe implements PipeTransform {
  transform(array: number[]): number {
    const sum = array.reduce((partialSum, a) => partialSum + a, 0);
    return sum / array.length;
  }
}
