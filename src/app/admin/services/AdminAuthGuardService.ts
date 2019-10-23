import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { map, switchMap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
   return this.auth.appUser$
      .map((appUser: AppUser) => appUser.isAdmin)
  }
}
