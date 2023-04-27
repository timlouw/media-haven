import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  token!: any;

  constructor(private http: HttpClient) {}

  getToken() {
      const url = 'https://integration.mediahaven.com/auth/ropc.php';
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      const encodedBody = new URLSearchParams({
        'username': 'recruitment',
        'password': 'recruitment',
        'client_id': 'iY8a3EMYtePL3UUmsBoA7Zwt86WjdtN1',
        'client_secret': '46YGOGEc5fM6rU610Epap3d7RGK38wym',
      });

      return this.http.post(url, encodedBody.toString(), {headers}).pipe(tap((token: any) => {
        this.token = token.access_token;
      }));
  }

  getRecords() {
    const url = 'https://integration.mediahaven.com/mediahaven-rest-api/v2/records';

    return this.http.get(url, {headers: {'Authorization': this.token}});
  }

  getRecord(ID: string) {
    const url = 'https://integration.mediahaven.com/mediahaven-rest-api/v2/records/' + ID;

    return this.http.get(url, {headers: {'Authorization': this.token}});
  }
}
