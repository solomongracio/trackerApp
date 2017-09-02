import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'forfilter',
    pure: false
})
export class ForFilterPipe implements PipeTransform {
    transform(items: any[], filter: string, value: string): any {
        if (!items || !filter || !value || value === '') {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => item[filter] === value);
    }
}
