export interface Config {
    version: string,
    language: string,
    reports: any,
    delay: number,
    scenario: string,
    contacts: any[],
    copyright: string,
    license: string,
    translations: 'en' | 'de' | any,
    changelog: any,
    appTitle: string,
    languageCodes: any,
    cognosRepository: string,
    cognosDomain: string,
    target: string,
    simulateUnauthorized: number,
    heartbeat: number
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