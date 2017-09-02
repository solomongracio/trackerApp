import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let dateKey = 'date';
        if (args) {
            dateKey = args;
        }
        const newVal = value.sort((a: any, b: any) => {
            const date1 = new Date(a[dateKey]);
            const date2 = new Date(b[dateKey]);

            if (date1 < date2) {
                return 1;
            } else if (date1 > date2) {
                return -1;
            } else {
                return 0;
            }
        });

        return newVal;
    }

}
