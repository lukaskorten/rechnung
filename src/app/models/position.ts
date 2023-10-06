import { ApiLeistung } from '../api/api-rechnung';

export class Position {
  constructor(private readonly data: ApiLeistung) {}

  get bezeichnung(): string {
    return `${this.data.bezeichnung} (${this.data.stundensatz.name})`;
  }

  get menge(): number {
    return this.data.menge;
  }

  get preisProEinheit(): number {
    return this.data.stundensatz.betrag;
  }

  get preis(): number {
    return this.menge * this.preisProEinheit;
  }
}
