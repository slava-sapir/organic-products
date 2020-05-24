import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCardService } from './../shopping-card.service';
import { AppUser } from './../model/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCard } from '../model/shopping-card';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  card$: Observable<ShoppingCard>;
  count: number;

  constructor(private auth: AuthService, 
              private shoppingCardService: ShoppingCardService,
              private router: Router) { }

  async ngOnInit(){

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.card$ = await this.shoppingCardService.getCard();
  }

   logout() {
     this.auth.logout();
     this.router.navigate(['/']);
   }
}

