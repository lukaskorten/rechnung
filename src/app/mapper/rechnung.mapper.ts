import {
  ApiLeistung,
  ApiRechnung,
  ApiZahlungsbedingungen,
} from '../api/api-rechnung';
import { Position, Rechnung } from '../dtos/rechnung';

export class RechnungMapper {
  private static readonly skontoBei30Tagen = 0.0225;
  private static readonly skontoBei15Tagen = 0.03;
  private static readonly skontoBeiMehrAls30Tage = 0;
  private static readonly umsatzsteuersatz = 0.19;

  static toDto(apiRechnung: ApiRechnung): Rechnung {
    const { kunde, zahlungsbedingungen, leistungen } = apiRechnung;

    return {
      id: apiRechnung.id,
      rechnungsnummer: apiRechnung.nummer,
      kundenname: kunde.name,
      kundennummer: kunde.nummer,
      erstelltAm: new Date(apiRechnung.erstelltAm),
      zahlungsziel: zahlungsbedingungen.zahlungsziel,
      zahlungsfristAm: this.zahlungsfristAm(apiRechnung),
      waehrung: apiRechnung.zahlungsbedingungen.waehrung,
      skonto: this.skonto(zahlungsbedingungen),
      positionen: this.positionen(leistungen),
      netto: this.netto(leistungen),
      brutto: this.brutto(apiRechnung),
      preisnachlass: this.preisnachlass(apiRechnung),
      umsatzsteuersatz: this.umsatzsteuersatz,
      umsatzsteuer: this.umsatzsteuer(apiRechnung),
    };
  }

  private static zahlungsfristAm(apiRechnung: ApiRechnung): Date {
    const rechnungsdatum = new Date(apiRechnung.erstelltAm);
    const { zahlungsziel } = apiRechnung.zahlungsbedingungen;
    rechnungsdatum.setDate(rechnungsdatum.getDate() + zahlungsziel);
    return rechnungsdatum;
  }

  private static preisnachlass(rechnung: ApiRechnung): number {
    const { leistungen, zahlungsbedingungen } = rechnung;
    return this.netto(leistungen) * this.skonto(zahlungsbedingungen);
  }

  private static netto(leistungen: ApiLeistung[]): number {
    return leistungen
      .map(({ menge, stundensatz }) => menge * stundensatz.betrag)
      .reduce((acc, p) => acc + p, 0);
  }

  private static skonto(zahlungsbedingungen: ApiZahlungsbedingungen): number {
    const { zahlungsziel } = zahlungsbedingungen;
    if (zahlungsziel === 30) {
      return this.skontoBei30Tagen;
    } else if (zahlungsziel === 15) {
      return this.skontoBei15Tagen;
    }
    return this.skontoBeiMehrAls30Tage;
  }

  private static umsatzsteuer(apiRechnung: ApiRechnung): number {
    return this.netto(apiRechnung.leistungen) * this.umsatzsteuersatz;
  }

  private static brutto(apiRechnung: ApiRechnung): number {
    return (
      this.netto(apiRechnung.leistungen) -
      this.preisnachlass(apiRechnung) +
      this.umsatzsteuer(apiRechnung)
    );
  }

  private static positionen(leistungen: ApiLeistung[]): Position[] {
    return leistungen.map(({ menge, stundensatz, bezeichnung }) => ({
      bezeichnung,
      menge,
      preisProEinheit: stundensatz.betrag,
      preis: menge * stundensatz.betrag,
    }));
  }
}
