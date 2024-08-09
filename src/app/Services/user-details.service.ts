import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../Models/user-response';
import { SingleUser } from '../Models/single-user';
import { CacheService } from './cash-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getUsers(page: number): Observable<UserResponse> {
    const url = `${this.apiUrl}?page=${page}`;

    const cachedResponse = this.cacheService.get(url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.http
      .get<UserResponse>(url)
      .pipe(tap((response) => this.cacheService.put(url, response)));
  }

  getUserById(id: number): Observable<SingleUser> {
    const url = `${this.apiUrl}/${id}`;

    const cachedResponse = this.cacheService.get(url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.http
      .get<SingleUser>(url)
      .pipe(tap((response) => this.cacheService.put(url, response)));
  }
}
