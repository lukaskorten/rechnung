import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ApiRechnung } from '../api/api-rechnung';
import { RechnungApiService } from '../api/rechnung-api.service';
import { rechnungen } from '../api/rechnungen';

@Injectable({
  providedIn: 'root',
})
export class RechnungService {
  constructor(readonly rechnungenApi: RechnungApiService) {}

  getRechnung(id: string): Observable<ApiRechnung> {
    return this.rechnungenApi.getOne(id);
  }

  getRechnungen(): Observable<ApiRechnung[]> {
    return this.rechnungenApi.getAll();
  }
}
