export interface Config {
    version: string,
    debug: boolean
    language: string,
    reports: any,
    delay: number,
    scenario: string,
    contacts: any[],
    copyright: string,
    license: string,
    corpintra: boolean;
    translations: 'en' | 'de' | any,
    changelog: any,
    appTitle: string,
    languageCodes: any,
    cognosRepository: string,
    cognosDomain: string,
    target: string,
    simulateUnauthorized: number,
    heartbeat: number
    capabilities: any
}

export interface HeaderLink {
    link: string
    text: string
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
    PlantGroupEnglish = 'Werksgruppierung (deutsch)',
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
}

export interface DateRanges {
    actual: ReportState['actualDateRange'];
    previous: ReportState['previousDateRange'];
}
