export interface Config {
    version: string,
    language: string,
    reports: any,
    delay: number,
    scenario: string,
    contacts: any[],
    copyright: string,
    license: string,
    translations: 'en' | 'de' | any
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