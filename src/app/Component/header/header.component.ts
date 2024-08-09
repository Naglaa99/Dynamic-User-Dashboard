import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SingleUser } from '../../Models/single-user';
import { UserDetailsService } from '../../Services/user-details.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchId: number | null = null;
  userDetails: SingleUser | null = null;

  constructor(private userDetailsService: UserDetailsService) {}

  onSearch(event: Event) {
    event.preventDefault(); 

    console.log('Search ID:', this.searchId);
    if (this.searchId !== null && this.searchId > 0) {
      this.userDetailsService.getUserById(this.searchId).subscribe({
        next: (response: SingleUser) => {
          console.log('User Details:', response);
          this.userDetails = response;
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
          this.userDetails = null;
        },
      });
    } else {
      console.warn('Invalid search ID:', this.searchId);
      this.userDetails = null;
    }
  }
}
