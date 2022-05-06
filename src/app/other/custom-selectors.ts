import { createSelector } from "@ngxs/store";
import { ConfigState } from "@store/config.state";
import { OrderBacklogState } from "@store/order-backlog.state";
import { OrderIntakeHistoryState } from "@store/order-intake-history.state";
import * as moment from "moment";
import { classifyByProperty } from "./functions";
import { BacklogColumns, IntakeHistoryColumns, ReportState } from "./interfaces";

/**
 * CustomSelectors is used to retrieve data, changes or calculations when changes from
 * 2 or more states are necessary to retrieve a value
 * Usage: Import CustomSelectors and use CustomSelectors.<FunctionToUse>()
 * This class does not require instatiation
 *
 * createSelector makes possible to select multiple states or other selectors at once.
 * For example:
 *   Instead of:
 *     this._store.select(PeriodsState.GetSelected).pipe(
 *       switchMap(period => <another_function_depending_on_period>)
 *     )
 *   Use:
 *     createSelector([
 *       PeriodsState.GetSelected,
 *       <another_function_depending_on_period>,
 *       <another_function_depending_on_previous_function>,
 *       etc
 *     ])
 */
export class CustomSelectors {

    // Get all rows for a selected zone or plant
    static GetZoneOrPlantRows(type: 'plant' | 'zone' | string, value: string, report: string = null) {

        let state: typeof OrderIntakeHistoryState | typeof OrderBacklogState;
        switch(report) {
            case 'order_intake_history':
                state=OrderIntakeHistoryState
                break;
            case 'order_backlog':
            default:
                state=OrderBacklogState
                break;
        }

        return createSelector([
            state
        ], (ctx: ReportState) => {
            return this.ClassifyByZoneOrPlantFn(ctx.rows, type, value);
        });
    }

    // Get all products and regions for a selected zone or plant and month
    static GetMonthRows(type: 'plant' | 'zone' | string, value: string, month: string, report: string = null) {

        let state: typeof OrderIntakeHistoryState | typeof OrderBacklogState;
        switch(report) {
            case 'order_intake_history':
                state=OrderIntakeHistoryState
                break;
            case 'order_backlog':
            default:
                state=OrderBacklogState
                break;
        }

        return createSelector([
            state
        ], (ctx: ReportState) => {
            // First get rows from previous level (plant / zone)
            const plantRows = this.ClassifyByZoneOrPlantFn(ctx.rows, type, value);
            // Then filter by the selected month
            return this.FilterByMonthFn(plantRows, month, report);
        });
    }

    // Get all products / regions for a selected zone or plant, month and region or product
    // tslint:disable-next-line: max-line-length
    static GetRegionOrProductRows(type: 'plant' | 'zone' | string, value: string, month: string, lvl4type: 'product' | 'region', lvl4value: string, report: string = null) {
        
        let state: typeof OrderIntakeHistoryState | typeof OrderBacklogState;
        switch(report) {
            case 'order_intake_history':
                state=OrderIntakeHistoryState
                break;
            case 'order_backlog':
            default:
                state=OrderBacklogState
                break;
        }
        
        return createSelector([
            state,
            ConfigState.GetLanguageHuman
        ], (ctx: ReportState, lang: string) => {
            // First get rows from previous level (plant / zone)
            const plantRows = this.ClassifyByZoneOrPlantFn(ctx.rows, type, value);
            // Then filter by the selected month
            const monthRows = this.FilterByMonthFn(plantRows, month, report);
            // Then filter by the selected region or product
            return this.FilterByRegionOrProductFn(monthRows, lvl4type, lvl4value, lang, report);
        });
    }

    // Reusable function to classify rows on Plant or Zone
    static ClassifyByZoneOrPlantFn(rows: any[], type: 'plant' | 'zone' | string, value: string) {
        if (type === 'zone') {
            return classifyByProperty(rows, BacklogColumns.SortKey_PlantGroup)[value];
        } else {
            return classifyByProperty(rows, BacklogColumns.SortKey_Plant)[value];
        }
    }

    // Reusable function to filter rows by Month
    static FilterByMonthFn(rows: any[], month: string, report: string = null) {

        let columnName: string;
        let incommingDateFormat: string;

        switch(report) {
            case 'order_intake_history':
                columnName = IntakeHistoryColumns.Date
                incommingDateFormat = 'YYYYMM'
                break;
            case 'order_backlog':
            default:
                columnName = BacklogColumns.Date
                incommingDateFormat = 'YYYY-MM-DD'
                break;
        }

        return rows.reduce((r, a) => {
            const monthLabel = moment(a[columnName], incommingDateFormat).format('YYYY-MM');
            r[monthLabel] = r[monthLabel] || [];
            r[monthLabel].push(a);
            return r;
        }, {})[month];
    }

    // Reusable function to filter rows by product or region
    static FilterByRegionOrProductFn(rows: any[], type: 'product' | 'region', value: string, lang: string, report: string = null) {
        
        let reportInterface;
        switch(report) {
            case 'order_intake_history':
                reportInterface=IntakeHistoryColumns
                break;
            case 'order_backlog':
            default:
                reportInterface=BacklogColumns
                break;
        }
        
        // We filter by the opposite selected type, because if we click on a region we want the products and viceversa
        const column = type === 'product' ? reportInterface[`Product${lang}`] : reportInterface[`Region${lang}`];
            return rows.reduce((r, a) => {
            r[a[column]] = r[a[column]] || [];
            r[a[column]].push(a);
            return r;
        }, {})[value];
    }

}
