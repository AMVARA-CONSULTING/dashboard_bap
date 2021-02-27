export interface Config {
    /** apiDomain serves as backend URL for DEV environments, and is normally blank */
    apiDomain: string;
    apiLink: string;
    appTitle: string;

    capabilities: any;
    changelog: any;
    cognosApiWorkaround: boolean;
    contacts: any[];
    copyright: string;
    corpintra: boolean;

    debug: boolean;
    delay: number;

    enableReports: any;

    heartbeat: number;

    loading: boolean;
    language: ILanguage;
    languageCodes: any;
    license: string;

    /** newLogin {value:"true", comment: ""}, if false, then loginForm from Cognos/OIDC will be used  */
    newLogin: any;

    portal: string;

    reports: IConfigReports;
    reportLinks: ReportLink[];

    scenario: string;

    translations: 'en' | 'de' | any;
    target: string;

    simulateUnauthorized: number;

    version: string;
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
