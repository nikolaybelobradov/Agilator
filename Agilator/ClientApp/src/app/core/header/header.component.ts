import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isAuthenticated!: boolean;

  constructor(private authService: AuthService) {};
  
  ngOnInit(): void {
    this.authService.authChanged.subscribe(response => {this.isAuthenticated = response})
  };

  logout() {
    this.authService.logout();
  }
}
