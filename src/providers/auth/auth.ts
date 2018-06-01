import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import {ReplaySubject, Observable} from "rxjs";

import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';

import { SERVER_URL } from '../../models/config';


@Injectable()
export class AuthProvider {

  jwtKey = 'jwt_token';
  authUser = new ReplaySubject<any>(1);
  authorizationURl: string = '/oauth/token'

  constructor(
    public http: HttpClient,
    private readonly jwtHelper: JwtHelperService,
    private readonly storage: Storage
  ) {}


  // TODO: Change to userAuth model pretty soon
  login(values: any): Observable<any> {

    // TODO: text maybe replaced to "json"
    return this.http
             .post(`${SERVER_URL}/${authorizationURl}`, values, {responseType: 'text'})
             .pipe( tap(jwt => this.handleJwtResponse(jwt)) );

  }

  logout(): void {
     this.storage.remove(this.jwtTokenName)
                  .then(() => this.authUser.next(null));
  }

  checkAuthentication(): void {

    this.storage.get(this.jwtKey)
          .then(jwt => {

              let isTokenAvailable = jwt && !this.jwtHelper.isTokenExpired(jwt);

              if(isTokenAvailable){
                  this.http
                  .get(`${SERVER_URL}/authenticate`)
                    .subscribe(
                       () => this.authUser.next(jwt),
                       (err) => this.storage.remove(this.jwtKey)
                                .then(() => this.authUser.next(null))
                    )
              }
              else
                this.storage.remove(this.jwtKey)
                              .then(() => this.authUser.next(null));

          });

  }

  private handleJwtResponse(jwt: string) {

    return this.storage.set(this.jwtTokenName, jwt)
                  .then(() => this.authUser.next(jwt))
                  .then(() => jwt)

  }


}
