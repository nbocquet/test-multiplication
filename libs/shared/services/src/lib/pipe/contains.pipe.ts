import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contains',
  standalone: true,
})
export class ContainsPipe<T extends object> implements PipeTransform {
  transform(value: T, args: T[]): boolean {
    return args.some(arg =>
      Object.keys(arg).every(
        argKey => value[argKey as keyof T] === arg[argKey as keyof T]
      )
    );
  }
}
