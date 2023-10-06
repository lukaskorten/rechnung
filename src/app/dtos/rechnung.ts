interface Position {
  bezeichnung: string;
  menge: number;
  preisProEinheit: number;
  preis: number;
}

export interface Rechnung {
  id: string;
  rechnungsnummer: string;
  kundenname: string;
  kundennummer: string;
  erstelltAm: Date;
  zahlungsziel: number;
  zahlungsfristAm: Date;
  skonto: number;
  positionen: Position;
  netto: number;
  brutto: number;
  preisnachlass: number;
  umsatzsteuersatz: number;
  umsatzsteuer: number;
}
