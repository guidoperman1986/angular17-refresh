import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(text: string, search: string): string {
    if (!search || !text) {
      return text;
    }

    const escapedSearch = this.escapeRegExp(search);
    const regex = new RegExp(escapedSearch, 'gi');
    return text.replace(regex, match => `<mark>${match}</mark>`);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

}
