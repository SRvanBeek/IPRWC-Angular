import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform{
  transform(value: any, maxLength: number) {
    if (value.length > maxLength) {
      return value.slice(0, maxLength) + '...';
    }
    return value;
  }

}

