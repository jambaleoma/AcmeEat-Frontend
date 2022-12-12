import { Pipe, PipeTransform } from '@angular/core';
import citta from './../../../assets/JSON/citta.json';

@Pipe({
  name: 'cittaByCodice'
})
export class CittaByCodicePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return citta.listaCitta.find(c => c.codice === value).nome;
  }

}
