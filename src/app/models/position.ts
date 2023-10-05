import { ApiLeistung } from '../api/api-rechnung';

export class Position {
  constructor(private readonly data: ApiLeistung) {}

  get bezeichnung(): string {
    return `${this.data.bezeichnung} (${this.data.stundensatz.name})`;
  }

  get anzahlStunden(): number {
    return this.data.menge;
  }

  get stundensatz(): number {
    return this.data.stundensatz.betrag;
  }

  get preis(): number {
    return this.anzahlStunden * this.stundensatz;
  }
}
