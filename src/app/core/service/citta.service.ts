import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import listacitta from './../../../assets/JSON/elencoCitta.json';

@Injectable({
  providedIn: 'root'
})
export class CittaService {

  constructor() {}

  getAllcitta(): Observable<any> {
    const data$ = of(listacitta);
    return data$;
  }
}
