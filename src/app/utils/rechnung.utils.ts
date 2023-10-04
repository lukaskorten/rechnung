import {
  ApiLeistung,
  ApiRechnung,
  ApiZahlungsbedingungen,
} from '../api/api-rechnung';

export function preisnachlass(rechnung: ApiRechnung): number {
  const { leistungen, zahlungsbedingungen } = rechnung;
  return preis(leistungen) * skonto(zahlungsbedingungen);
}

export function preis(leistungen: ApiLeistung[]): number {
  return leistungen
    .map((l) => leistungspreis(l))
    .reduce((acc, p) => acc + p, 0);
}

export function leistungspreis(leistung: ApiLeistung): number {
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

export function umsatzsteuer(netto: number, steuersatz: number): number {
  return netto * (steuersatz / 100);
}

export function brutto(rechnung: ApiRechnung, steuersatz: number): number {
  const netto = preis(rechnung.leistungen);
  return netto - preisnachlass(rechnung) + umsatzsteuer(netto, steuersatz);
}

export function zahlungsfristAm(rechnung: ApiRechnung): Date {
  const rechnungsdatum = new Date(rechnung.erstelltAm);
  const { zahlungsziel } = rechnung.zahlungsbedingungen;
  rechnungsdatum.setDate(rechnungsdatum.getDate() + zahlungsziel);
  return rechnungsdatum;
}
