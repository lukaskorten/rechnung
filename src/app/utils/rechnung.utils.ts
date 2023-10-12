import { ApiLeistung, ApiRechnung, ApiZahlungsbedingungen } from '../api';

export const UMSATZSTEUERSATZ = 0.19;

export function zahlungsfristAm(rechnung: ApiRechnung): Date {
  const rechnungsdatum = new Date(rechnung.erstelltAm);
  const { zahlungsziel } = rechnung.zahlungsbedingungen;
  rechnungsdatum.setDate(rechnungsdatum.getDate() + zahlungsziel);
  return rechnungsdatum;
}

export function preisnachlass(rechnung: ApiRechnung): number {
  const { leistungen, zahlungsbedingungen } = rechnung;
  return netto(leistungen) * skonto(zahlungsbedingungen);
}

export function preisProEinheit(leistung: ApiLeistung): number {
  return leistung.menge * leistung.stundensatz.betrag;
}

export function skonto(zahlungsbedingungen: ApiZahlungsbedingungen): number {
  const { zahlungsziel } = zahlungsbedingungen;
  if (zahlungsziel === 30) {
    return 0.0225;
  } else if (zahlungsziel === 15) {
    return 0.03;
  }
  return 0;
}

export function netto(leistungen: ApiLeistung[]): number {
  return leistungen
    .map((l) => preisProEinheit(l))
    .reduce((acc, p) => acc + p, 0);
}

export function umsatzsteuer(netto: number): number {
  return netto * UMSATZSTEUERSATZ;
}

export function brutto(rechnung: ApiRechnung): number {
  const nettobetrag = netto(rechnung.leistungen);
  return nettobetrag - preisnachlass(rechnung) + umsatzsteuer(nettobetrag);
}
