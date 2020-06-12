import { Router, NavigationEnd } from '@angular/router';
import { Observable, fromEvent, timer } from 'rxjs';
import { ShoppingCardService } from '../../shared/services/shopping-card.service';
import { AppUser } from '../../shared/models/app-user';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCard } from '../../shared/models/shopping-card';
import { publishReplay, refCount, switchMap } from 'rxjs/operators';






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
  card; // Observable<ShoppingCard>;
  count: any;
  public isMenuCollapsed = true;

  ngOnInit() {

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shoppingCardService.refreshPage.subscribe(() => this.getCartById());
    this.getCartById();
   // setTimeout( () => { this.card$ = this.shoppingCardService.getCardById(); }, 1000 );
   // this.card$ = this.shoppingCardService.getCardById();
  }

  private getCartById() {
  setTimeout( () => { this.shoppingCardService.getCardById()
  .subscribe( cart => this.card = cart); }, 2000 );
  }

   logout() {
     this.auth.logout();
     this.router.navigate(['/']);
   }

 

}

