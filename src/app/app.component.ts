import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  count;
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.userData$.subscribe(user => {
      if (!user) { return; }
      userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }
      localStorage.removeItem('returnUrl');
      const promise = router.navigateByUrl(returnUrl);
      promise.then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));

      });
  }

}




