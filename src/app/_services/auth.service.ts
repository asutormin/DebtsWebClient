import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {AuthUser} from '../_interfaces/interfaces';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<AuthUser>;
  public currentUser: Observable<AuthUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthUser {
    const currentUser = this.currentUserSubject.value;
    if (currentUser != null) {
      const token = currentUser.token;
      if (token != null) {
        const isTokenExpired = this.jwtHelper.isTokenExpired(currentUser.token);
        if (!isTokenExpired) {
          return this.currentUserSubject.value;
        }
      }
    }

    this.logout();
    return null;
  }

  login(login: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/authenticate`, {login, password})
      .pipe(map(authUser => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(authUser));
        this.currentUserSubject.next(authUser);
        return authUser;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

