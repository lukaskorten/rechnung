import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ApiRechnung } from './api-rechnung';
import { rechnungen } from './rechnungen';

@Injectable({
  providedIn: 'root',
})
export class RechnungApiService {
  getOne(id: string): Observable<ApiRechnung> {
    const rechnung = rechnungen.get(id);
    return rechnung ? of(rechnung) : EMPTY;
  }

  getAll(): Observable<ApiRechnung[]> {
    return of([...rechnungen.values()]);
  }
}
