import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, retry } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl="http://localhost:5000/api/";
  private currentUsreSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUsreSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + "accounts/login", model).pipe(
      map((response: User) => {
        const user = response
        if(user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUsreSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + "accounts/register", model).pipe(
      map((respose: User) => {
        if(respose) {
          localStorage.setItem("user", JSON.stringify(respose));
          this.currentUsreSource.next(respose);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUsreSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUsreSource.next(null);
  }
}
