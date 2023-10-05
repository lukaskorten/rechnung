interface ApiKunde {
  name: string;
}

export interface ApiRechnung {
  id: string;
  nummer: string;
  kunde: ApiKunde;
  leistungen: ApiLeistung[];
  erstelltAm: string;
  zahlungsbedingungen: ApiZahlungsbedingungen;
}

export interface ApiZahlungsbedingungen {
  zahlungsziel: number;
  waehrung: 'EUR' | 'USD';
}

export interface ApiLeistung {
  bezeichnung: string;
  menge: number;
  stundensatz: ApiStundensatz;
}

export interface ApiStundensatz {
  name: string;
  betrag: number;
}
