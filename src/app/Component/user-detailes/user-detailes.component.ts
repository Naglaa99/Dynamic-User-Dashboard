import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetailsService } from '../../Services/user-details.service';
import { UserResponse } from '../../Models/user-response';
import { SingleUser } from '../../Models/single-user';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-detailes',
  templateUrl: './user-detailes.component.html',
  styleUrls: ['./user-detailes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    RouterOutlet,
    HeaderComponent,
  ],
})
export class UserDetailesComponent implements OnInit {
  users: UserResponse['data'] = [];
  totalUsers: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  searchId: number | null = null;
  userDetails: SingleUser | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userDetailsService: UserDetailsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllUsersData(this.pageIndex + 1);
  }

  getAllUsersData(page: number) {
    this.userDetailsService.getUsers(page).subscribe({
      next: (response: UserResponse) => {
        this.users = response.data;
        this.totalUsers = response.total;
        this.pageSize = response.per_page;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.getAllUsersData(this.pageIndex + 1);
  }

  searchTheUserDetails(id: number) {
    if (id) {
      this.userDetailsService.getUserById(id).subscribe({
        next: (response: SingleUser) => {
          this.userDetails = response;
          this.users = [];
          this.totalUsers = 1;
          if (this.paginator) {
            this.paginator.pageIndex = 0;
          }
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
          this.users = [];
          this.userDetails = null;
        },
      });
    } else {
      this.getAllUsersData(this.pageIndex + 1);
      this.userDetails = null;
    }
  }

  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchId !== null) {
      this.searchTheUserDetails(this.searchId);
    } else {
      console.error('Search ID is null');
    }
  }
  navigateToUserDetails(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
