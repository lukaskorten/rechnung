import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RechnungApiService } from '../api/rechnung-api.service';
import { Rechnung } from '../dtos/rechnung';
import { toRechnung, toRechnungen } from '../mapper/to-rechnung';

@Injectable({
  providedIn: 'root',
})
export class RechnungService {
  constructor(readonly rechnungenApi: RechnungApiService) {}

  getRechnung(id: string): Observable<Rechnung> {
    return this.rechnungenApi.getOne(id).pipe(map(toRechnung));
  }

  getRechnungen(): Observable<Rechnung[]> {
    return this.rechnungenApi.getAll().pipe(map(toRechnungen));
  }
}
