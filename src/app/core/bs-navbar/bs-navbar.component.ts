import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCardService } from '../../shared/services/shopping-card.service';
import { AppUser } from '../../shared/models/app-user';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCard } from '../../shared/models/shopping-card';



@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor(private auth: AuthService,
              private shoppingCardService: ShoppingCardService,
              private router: Router) {}
  appUser: AppUser;
  card$: Observable<ShoppingCard>;
  count: number;

  ngOnInit() {

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
   
    setTimeout( () => {this.card$ = this.shoppingCardService.getCardById(); }, 1000 );

  }

   logout() {
     this.auth.logout();
     this.router.navigate(['/']);
   }

}

