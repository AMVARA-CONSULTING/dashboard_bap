import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantOrZone, RegionOrProduct } from '@other/interfaces';

/**
 * Route Handler Actions for Order Backlog
 * If no params are passed to those functions, will try to use those from the current URL
 */
@Injectable()
export class OrderBacklogRouter {

    constructor(
        private _router: Router
    ) { }

    goToMainView() {
        this._router.navigate(['/order-backlog']);
    }

    goToPlantZoneView(route: ActivatedRoute, plantType?: PlantOrZone, plantValue?: string) {
        plantType = plantType || route.snapshot.params.plant;
        plantValue = plantValue || route.snapshot.params.id;
        this._router.navigate([
            '/order-backlog',
            plantType,
            plantValue
        ]);
    }

    goToMonthView(route: ActivatedRoute, plantType?: PlantOrZone, plantValue?: string, month?: string) {
        plantType = plantType || route.snapshot.params.plant;
        plantValue = plantValue || route.snapshot.params.id;
        month = month || route.snapshot.params.month;
        this._router.navigate([
            '/order-backlog',
            plantType,
            plantValue,
            'month',
            month
        ]);
    }

    // tslint:disable-next-line: max-line-length
    goToProductRegionView(route: ActivatedRoute, plantType: PlantOrZone, plantValue: string, month: string, itemType: RegionOrProduct, itemValue: string) {
        plantType = plantType || route.snapshot.params.plant;
        plantValue = plantValue || route.snapshot.params.id;
        month = month || route.snapshot.params.month;
        itemType = itemType || route.snapshot.params.type;
        itemValue = itemValue || route.snapshot.params.value;
        this._router.navigate([
            '/order-backlog',
            plantType,
            plantValue,
            'month',
            month,
            itemType,
            itemValue
        ]);
    }

}
