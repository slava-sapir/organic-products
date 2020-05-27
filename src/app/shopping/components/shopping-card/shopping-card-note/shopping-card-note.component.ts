import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCard } from 'src/app/shared/models/shopping-card';

@Component({
  selector: 'shopping-card-note',
  templateUrl: './shopping-card-note.component.html',
  styleUrls: ['./shopping-card-note.component.css']
})
export class ShoppingCardNoteComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('shopping-card') card: ShoppingCard;
  
  constructor() { }

  ngOnInit(): void {
  }

}
