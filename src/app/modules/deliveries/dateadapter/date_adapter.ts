import { NativeDateAdapter } from "@angular/material/core";

export class DeliveriesDateAdapter extends NativeDateAdapter {
    
    getFirstDayOfWeek(): number {
        // retuns monday as the first day of the week
        return 1;
    }

    format(date: Date, displayFormat: Object): string {
        if ( displayFormat['year'] == "numeric" && displayFormat['month'] == "numeric" && displayFormat['day'] == "numeric" ){
            const seperator = "/";
            return `${date.getDate().toString().padStart(2, '0')}${seperator}${(date.getMonth() + 1).toString().padStart(2, '0')}${seperator}${date.getFullYear()}`;
        }
        return super.format(date, displayFormat);
    }
}