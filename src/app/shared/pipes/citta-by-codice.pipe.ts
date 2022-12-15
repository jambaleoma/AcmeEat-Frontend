import { Pipe, PipeTransform } from '@angular/core';
import listacitta from './../../../assets/JSON/elencoCitta.json';

@Pipe({
  name: 'cittaByCodice'
})
export class CittaByCodicePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return listacitta.listacitta.find(c => c.codice === value).nome;
  }

}
