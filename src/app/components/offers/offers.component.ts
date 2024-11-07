import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent implements OnInit {
  offers$: Observable<Offer[]> = new Observable<Offer[]>();

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    const authToken = 'your_auth_token';
    this.offers$ = this.offerService.getOffers(authToken).pipe(
      map((offers: Offer[]) => this.sortOffers(offers))
    );
  }

  private sortOffers(offers: Offer[]): Offer[] {
    return offers.sort((a, b) => {
      // Sort by contractStartDate in ascending order
      return new Date(a.contractStartDate).getTime() - new Date(b.contractStartDate).getTime();
    });
  }
}
