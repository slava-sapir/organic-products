import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService) {
              this.userData$ = afAuth.authState;
  }

  login(name: string) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    switch(name) {
      case 'facebook':
        this.afAuth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
        break;
      case 'twitter':
        this.afAuth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
        break;
      case 'google':
        this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        break;
      case 'git':
        this.afAuth.signInWithRedirect(new firebase.auth.GithubAuthProvider());
        break;
      default:
    }

       // this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }



  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.userData$.pipe(switchMap(user => {
          if (user) {
            return this.userService.get(user.uid).valueChanges();
          }
          return of(null);
    }));
  }

}
