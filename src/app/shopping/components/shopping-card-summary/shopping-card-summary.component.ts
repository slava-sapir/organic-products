import { Component, Input } from '@angular/core';
import { ShoppingCard } from 'src/app/shared/models/shopping-card';


@Component({
  selector: 'shopping-card-summary',
  templateUrl: './shopping-card-summary.component.html',
  styleUrls: ['./shopping-card-summary.component.css']
})
export class ShoppingCardSummaryComponent  {
  // tslint:disable-next-line: no-input-rename
  @Input('card') card: ShoppingCard;
}
