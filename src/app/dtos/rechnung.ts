export interface Rechnung {
  id: string;
  rechnungsnummer: string;
  kundenname: string;
  kundennummer: string;
  erstelltAm: Date;
  zahlungsziel: number;
  faelligAm: Date;
  waehrung: Waehrung;
  skonto: number;
  positionen: Rechnungsposition[];
  netto: number;
  brutto: number;
  preisnachlass: number;
  umsatzsteuersatz: number;
  umsatzsteuer: number;
}

export type Waehrung = 'EUR' | 'USD';

export interface Rechnungsposition {
  bezeichnung: string;
  menge: number;
  preisProEinheit: number;
  preis: number;
}
