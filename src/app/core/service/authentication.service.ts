import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Director } from 'src/app/shared/models/director.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private myAppUrl = environment.myAppUrl +'/portaleAcmeEat';
  private loginUrl = '/loginDirettore';
  private logoutUrl = '/logoutDirettore';
  private registerUrl = '/registraDirettore';
  private resetPswUrl = '/account/password';
  private creaPortale = '/creaPortale';

  constructor(private http: HttpClient) {}

  // Get the status
  login(director: Director): Observable<any> {
    const body = director;
    return this.http.post(this.myAppUrl + this.loginUrl, body);
  }

  register(director: Director): Observable<any> {
    const body = director;
    return this.http.post(this.myAppUrl + this.registerUrl, body);
  }

  resetPassword(codiceDirettore: string): Observable<any> {
    return this.http.put(this.myAppUrl + this.resetPswUrl + '?codiceDirettore=' + codiceDirettore, null)
  }

  logout(): Observable<any> {
    return this.http.get(this.myAppUrl + this.logoutUrl);
  }

  createPortal(initPortal: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.creaPortale, initPortal);
  }
}
