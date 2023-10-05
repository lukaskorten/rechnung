import { ApiRechnung } from '../api/api-rechnung';
import { Position } from './position';

export class Rechnung {
  constructor(private readonly data: ApiRechnung) {}

  get kunde(): string {
    return this.data.kunde.name;
  }

  get nummer(): string {
    return this.data.nummer;
  }

  get zahlungsziel(): number {
    return this.data.zahlungsbedingungen.zahlungsziel;
  }

  get erstelltAm(): Date {
    return new Date(this.data.erstelltAm);
  }

  get zahlungsfristAm(): Date {
    const result = new Date(this.erstelltAm);
    result.setDate(result.getDate() + this.zahlungsziel);
    return result;
  }

  get skonto(): number {
    if (this.zahlungsziel === 30) {
      return 0.0225;
    } else if (this.zahlungsziel === 15) {
      return 0.03;
    }
    return 0;
  }

  get positionen(): Position[] {
    return this.data.leistungen.map((l) => new Position(l));
  }
}
