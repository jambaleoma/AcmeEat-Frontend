import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CittaService {

  private myAppUrl = environment.myAppUrl + '/citta';

  constructor(private http: HttpClient) {}

  getAllcitta(): Observable<any> {
    return this.http.get(this.myAppUrl + '/all');
  }
}
