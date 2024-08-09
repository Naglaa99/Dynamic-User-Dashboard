import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailsService } from '../../Services/user-details.service';
import { SingleUser } from '../../Models/single-user';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatButtonModule, MatCardModule, CommonModule],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
})
export class UserListComponent implements OnInit {
  userDetails?: SingleUser;

  constructor(
    private route: ActivatedRoute,
    private userDetailsService: UserDetailsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = +params['id'];
      console.log('User ID from route:', userId);

      this.userDetailsService.getUserById(userId).subscribe({
        next: (response) => {
          console.log('User details:', response);
          this.userDetails = response.data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
        },
      });
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
