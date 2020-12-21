
export interface Config {
    version: string;
    debug: boolean;
    loading: boolean;
    language: ILanguage;
    reports: IConfigReports;
    delay: number;
    scenario: string;
    portal: string;
    contacts: any[];
    reportLinks: ReportLink[];
    cognosApiWorkaround: boolean;
    apiLink: string;
    apiDomain: string;
    copyright: string;
    license: string;
    corpintra: boolean;
    translations: 'en' | 'de' | any;
    changelog: any;
    appTitle: string;
    languageCodes: any;
    target: string;
    simulateUnauthorized: number;
    heartbeat: number;
    capabilities: any;
    enableReports: any;
}

export interface ReportLink {
    link: string;
    text: string;
}

export interface IConfigReports {
    trucks: IConfigEnvironment;
    vans: IConfigEnvironment;
}

export interface IConfigEnvironment {
    int: IReports<ReportInfo>;
    prod: IReports<ReportInfo>;
    columns: IReports<any>;
}

export interface IReports<T> {
    orderIntake: T;
    allocation: T;
    plantStock: T;
    productionProgram: T;
    orderBacklog: T;
}

export enum ReportTypes {
    OrderIntake = 'orderIntake',
    ProductionProgram = 'productionProgram',
    Allocation = 'allocation',
    PlantStock = 'plantStock',
    OrderBacklog = 'orderBacklog'
}

export interface ReportInfo {
    id: string;
    selector: string;
    fallback: string;
}

export type ILanguage = 'en' | 'de';

export interface HeaderLink {
    link: string;
    text: string;
}

export interface UserCapabilities {
    admin: boolean;
    mobile: boolean;
    trucks: SectionCapability;
    vans: SectionCapability;
}

export interface SectionCapability {
    order_intake: boolean;
    order_backlog: boolean;
    production_program: boolean;
    allocation: boolean;
    plant_stock: boolean;
}

export interface UserPreferences {
    timeZoneID: string
    skin: string
    format: string
    backgroundSessionLogging: string
    showHints: string
    userName: string
    type: string
    homePage: string
    url: string
    accessibilityFeatures: boolean
    isAnonymous: boolean
    productLocale: string
    showHiddenObjects: boolean
    id: string
    biDirectionalFeaturesEnabled: boolean
    defaultName: string
    contentLocale: string
    baseTextDirection: string
}

export interface ContactInfo {
    name: string,
    description: string,
    telephone: string
}

export interface SelectYearData {
    years: string[],
    year: string
}

export enum BacklogColumns {
    Date = 'Datum Tagesstand (konv.)',
    Datatype = 'Datatype',
    PlantEnglish = 'Plant (english)',
    PlantDeutsch = 'Werk (deutsch)',
    PlantGroupEnglish = 'Plant Group (english)',
    PlantGroupDeutsch = 'Werksgruppierung (deutsch)',
    ProductEnglish = 'Product (englisch)',
    ProductDeutsch = 'Produkt (deutsch)',
    RegionEnglish = 'Region (english)',
    RegionDeutsch = 'Region (deutsch)',
    SortKey_Plant = 'SortKey_Werk',
    SortKey_PlantGroup = 'SortKey_Werksgruppe',
    Quantity = 'Stückzahl'
}

export interface Zones {
    [zone: string]: any[];
}

export interface ReportState {
    rows: any[];
    plandate: string;
    actualDateRange: string[];
    previousDateRange: string[];
    latestDay: string;
    previousDay: string;
}

export interface OrderBacklogDays {
    latestDay: string;
    previousDay: string;
}

export interface DateRanges {
    actual: ReportState['actualDateRange'];
    previous: ReportState['previousDateRange'];
}

export type NgxLineChart = NgxLine[];

export interface NgxLine {
    name: string;
    series: NgxLineSerie[];
}

export interface NgxLineSerie {
    name: number | string | Date;
    value: number;
    extra?: any;
}

export type RegionOrProduct = 'region' | 'product';
export type PlantOrZone = 'plant' | 'zone';
