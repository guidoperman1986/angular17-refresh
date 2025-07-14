import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialPipe'
})
export class InitialPipePipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (value) {
      const words = value.split(' ');
      if (words.length > 0) {
        return words.map(word => word.charAt(0).toUpperCase()).join('');
      }
    }
    // If value is null or empty, return null
    return null;
  }

}
