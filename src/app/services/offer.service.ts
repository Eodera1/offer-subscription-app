import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export class Offer {
  // class implementation
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offersUrl = 'http://localhost:9999/offers';

  constructor(private http: HttpClient) { }

  getOffers(authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return this.http.get<Offer[]>(this.offersUrl, { headers });
  }
}