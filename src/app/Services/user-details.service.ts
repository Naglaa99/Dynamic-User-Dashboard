import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cash-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private baseUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;

    const cachedResponse = this.cacheService.get(url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.http
      .get<any>(url)
      .pipe(tap((response) => this.cacheService.put(url, response)));
  }

  getUsers(page: number): Observable<any> {
    const url = `${this.baseUrl}/users?page=${page}`;

    const cachedResponse = this.cacheService.get(url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.http
      .get<any>(url)
      .pipe(tap((response) => this.cacheService.put(url, response)));
  }
}
