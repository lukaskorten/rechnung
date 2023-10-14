import { ApiLeistung, ApiRechnung, ApiZahlungsbedingungen } from '../api';
import { Rechnungsposition, Rechnung } from '../dtos';

const skontoBei30Tagen = 0.0225;
const skontoBei15Tagen = 0.03;
const skontoBeiMehrAls30Tage = 0;
const umsatzsteuersatz = 0.19;

export function toRechnungen(sourceList: ApiRechnung[]): Rechnung[] {
  return sourceList.map(toRechnung);
}

export function toRechnung(source: ApiRechnung): Rechnung {
  return {
    id: source.id,
    rechnungsnummer: source.nummer,
    kundenname: source.kunde.name,
    kundennummer: source.kunde.nummer,
    erstelltAm: new Date(source.erstelltAm),
    faelligAm: faelligAm(source),
    zahlungsziel: source.zahlungsbedingungen.zahlungsziel,
    waehrung: source.zahlungsbedingungen.waehrung,
    skonto: skonto(source.zahlungsbedingungen),
    positionen: positionen(source.leistungen),
    netto: netto(source.leistungen),
    brutto: brutto(source),
    preisnachlass: preisnachlass(source),
    umsatzsteuer: umsatzsteuer(source),
    umsatzsteuersatz,
  };
}

function faelligAm(rechnung: ApiRechnung): Date {
  const rechnungsdatum = new Date(rechnung.erstelltAm);
  const { zahlungsziel } = rechnung.zahlungsbedingungen;
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

function umsatzsteuer(rechnung: ApiRechnung): number {
  return netto(rechnung.leistungen) * umsatzsteuersatz;
}

function brutto(rechnung: ApiRechnung): number {
  return (
    netto(rechnung.leistungen) -
    preisnachlass(rechnung) +
    umsatzsteuer(rechnung)
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
