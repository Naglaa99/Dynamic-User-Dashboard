import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../Models/user-response';
import { SingleUser } from '../Models/single-user';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}?page=${page}`);
  }

  getUserById(id: number): Observable<SingleUser> {
    return this.http.get<SingleUser>(`${this.apiUrl}/${id}`);
  }
}
