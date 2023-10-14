import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRechnung, RechnungApiService } from '../api';

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
