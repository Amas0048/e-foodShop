import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import 'rxjs/add/operator/switchMap'
import { of } from "rxjs";
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() {
    return this.user$
      .switchMap(user => {
        if(user) return this.userService.get(user.uid);

        return of(null);
      });
  }
}
