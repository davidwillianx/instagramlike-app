import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import {ReplaySubject, Observable} from "rxjs";
import { HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';

import { SERVER_URL } from '../../models/config';


@Injectable()
export class AuthProvider {

  jwtKey = 'jwt_token';
  // TODO: Should get string content as server response
  authUser = new ReplaySubject<any>(1);
  authorizationURl: string = 'oauth/token'
  httpHeaders = new HttpHeaders({
    'Authorization': 'Basic aW5zdGFncmFtLWxpa2UtYXBwOmIyYjJkMmQyMw==',
    'Content-Type': 'application/x-www-form-urlencoded'
  });



  constructor(
    public http: HttpClient,
    private readonly jwtHelper: JwtHelperService,
    private readonly storage: Storage
  ) {}


  // TODO: Change to userAuth model pretty soon
  login(values: any): Observable<any> {

    // TODO: text maybe replaced to "json"
    // return this.http
    //          .post(
    //            `${SERVER_URL}/${this.authorizationURl}`, values,
    //             {responseType: 'text', headers: this.httpHeaders}
    //           )
    //          .pipe( tap(jwt => this.handleJwtResponse(jwt)) );

    let data  = {
      client_id: 'instagram-like-app',
      grant_type: 'password',
      username: 'teste',
      password: 'teste1'
    };

    let bData = `client_id=${data.client_id}&grant_type=${data.grant_type}&username=${data.username}&password=${data.password}`;

    return this.http.post<any>(
      `${SERVER_URL}/${this.authorizationURl}`,
       bData,
      {headers: this.httpHeaders, responseType: 'application/json'}
    );

  }

  logout(): void {
     this.storage.remove(this.jwtKey  )
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

    return this.storage.set(this.jwtKey, jwt)
                  .then(() => this.authUser.next(jwt))
                  .then(() => jwt)

  }


}
