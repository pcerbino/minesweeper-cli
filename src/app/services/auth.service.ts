import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;

  token:any;

  constructor(private http: HttpClient, private storage: NativeStorage, private env: EnvService){ }

  login(email: String, password: String) {

    return this.http.post(this.env.API_URL + 'login', {email: email, password: password})
    
    .pipe(

      tap((token:any) => {

        this.token = token.token;
        this.isLoggedIn = true;

        this.storage.setItem('token', token).then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );

        

        return this.token;
      }),
    );
    
  }

  private setSession(authResult) {

      localStorage.setItem('id_token', authResult.token);
      this.token = authResult.token;
      this.isLoggedIn = true;      
  }

  register(name: String, email: String, password: String) {
  
    return this.http.post(this.env.API_URL + 'register', {name: name, email: email, password: password} )
  }

  logout() {

      this.storage.remove("token");
      this.isLoggedIn = false;
      delete this.token;
      return true;
  }

  user() {
  
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token});
    
    return this.http.get<User>(this.env.API_URL + 'user', { headers: headers }).pipe(
      tap(user => {
        return user;
      })
    )
  }

  getToken() {
    
    return this.storage.getItem('token').then(data => {

        this.token = data.token;
        if(this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },

      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}