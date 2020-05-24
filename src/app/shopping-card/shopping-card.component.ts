import { Observable } from 'rxjs';
import { ShoppingCardService } from './../shopping-card.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCard } from '../model/shopping-card';


@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  card$: Observable<ShoppingCard>;

  constructor(private shoppingCardService: ShoppingCardService) { }

  async ngOnInit() {
    this.card$ = await this.shoppingCardService.getCard();
  }

  clearCard() {
    this.shoppingCardService.clearCard();
  }

}
