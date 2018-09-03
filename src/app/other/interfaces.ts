export interface Config {
    version: string,
    language: string,
    reports: any,
    delay: number,
    scenario: string,
    contacts: any[],
    copyright: string,
    license: string
}

export interface ContactInfo {
    name: string,
    description: string,
    telephone: string
}