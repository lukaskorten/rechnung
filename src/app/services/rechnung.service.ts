import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RechnungApiService } from '../api/rechnung-api.service';
import { Rechnung } from '../dtos/rechnung';
import { RechnungMapper } from '../mapper/rechnung.mapper';

@Injectable({
  providedIn: 'root',
})
export class RechnungService {
  constructor(readonly rechnungenApi: RechnungApiService) {}

  getRechnung(id: string): Observable<Rechnung> {
    return this.rechnungenApi
      .getOne(id)
      .pipe(map((r) => RechnungMapper.toDto(r)));
  }

  getRechnungen(): Observable<Rechnung[]> {
    return this.rechnungenApi
      .getAll()
      .pipe(
        map((rechnungen) => rechnungen.map((r) => RechnungMapper.toDto(r))),
      );
  }
}
