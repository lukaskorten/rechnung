import {
  ApiLeistung,
  ApiRechnung,
  ApiZahlungsbedingungen,
} from '../api/api-rechnung';
import { Rechnungsposition, Rechnung } from '../dtos/rechnung';

const skontoBei30Tagen = 0.0225;
const skontoBei15Tagen = 0.03;
const skontoBeiMehrAls30Tage = 0;
const umsatzsteuersatz = 0.19;

export function toRechnungen(data: ApiRechnung[]): Rechnung[] {
  return data.map(toRechnung);
}

export function toRechnung(data: ApiRechnung): Rechnung {
  return {
    id: data.id,
    rechnungsnummer: data.nummer,
    kundenname: data.kunde.name,
    kundennummer: data.kunde.nummer,
    erstelltAm: new Date(data.erstelltAm),
    faelligAm: faelligAm(data),
    zahlungsziel: data.zahlungsbedingungen.zahlungsziel,
    waehrung: data.zahlungsbedingungen.waehrung,
    skonto: skonto(data.zahlungsbedingungen),
    positionen: positionen(data.leistungen),
    netto: netto(data.leistungen),
    brutto: brutto(data),
    preisnachlass: preisnachlass(data),
    umsatzsteuer: umsatzsteuer(data),
    umsatzsteuersatz,
  };
}

function faelligAm(apiRechnung: ApiRechnung): Date {
  const rechnungsdatum = new Date(apiRechnung.erstelltAm);
  const { zahlungsziel } = apiRechnung.zahlungsbedingungen;
  rechnungsdatum.setDate(rechnungsdatum.getDate() + zahlungsziel);
  return rechnungsdatum;
}

function preisnachlass(rechnung: ApiRechnung): number {
  const { leistungen, zahlungsbedingungen } = rechnung;
  return netto(leistungen) * skonto(zahlungsbedingungen);
}

function netto(leistungen: ApiLeistung[]): number {
  return leistungen
    .map(({ menge, stundensatz }) => menge * stundensatz.betrag)
    .reduce((acc, p) => acc + p, 0);
}

function skonto(zahlungsbedingungen: ApiZahlungsbedingungen): number {
  const { zahlungsziel } = zahlungsbedingungen;
  if (zahlungsziel === 30) {
    return skontoBei30Tagen;
  } else if (zahlungsziel === 15) {
    return skontoBei15Tagen;
  }
  return skontoBeiMehrAls30Tage;
}

function umsatzsteuer(apiRechnung: ApiRechnung): number {
  return netto(apiRechnung.leistungen) * umsatzsteuersatz;
}

function brutto(apiRechnung: ApiRechnung): number {
  return (
    netto(apiRechnung.leistungen) -
    preisnachlass(apiRechnung) +
    umsatzsteuer(apiRechnung)
  );
}

function positionen(leistungen: ApiLeistung[]): Rechnungsposition[] {
  return leistungen.map(({ menge, stundensatz, bezeichnung }) => ({
    menge,
    bezeichnung: `${bezeichnung} (${stundensatz.name})`,
    preisProEinheit: stundensatz.betrag,
    preis: menge * stundensatz.betrag,
  }));
}
