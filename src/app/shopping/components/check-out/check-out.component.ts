import { ShoppingCard } from '../../../shared/models/shopping-card';
import { ShoppingCardService } from '../../../shared/services/shopping-card.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
 
card$: Observable<ShoppingCard>;
constructor(private shoppingCardService: ShoppingCardService) {}

async ngOnInit() {
   this.card$ = await this.shoppingCardService.getCard(); 
}

}
