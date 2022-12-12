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
  private registerUrl = '/insertDirettore';
  private resetPswUrl = '/account/password';

  constructor(private http: HttpClient) {}

  // Get the status
  login(user: Director): Observable<any> {
    const body = user;
    return this.http.post(this.myAppUrl + this.loginUrl, body);
  }

  register(user: Director): Observable<any> {
    const body = user;
    return this.http.post(this.myAppUrl + this.registerUrl, body);
  }

  resetPassword(codiceDirettore: string): Observable<any> {
    return this.http.put(this.myAppUrl + this.resetPswUrl + '?codiceDirettore=' + codiceDirettore, null)
  }
}
