import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, retry } from 'rxjs';
import { User } from '../models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUsreSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUsreSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + "accounts/login", model).pipe(
      map((response: User) => {
        const user = response
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + "accounts/register", model).pipe(
      map((respose: User) => {
        if (respose) {
          this.setCurrentUser(respose);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUsreSource.next(user);
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUsreSource.next(null);
  }
}
