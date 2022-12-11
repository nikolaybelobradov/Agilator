import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isAuthenticated!: boolean;

  constructor(private authService: AuthService, private router: Router) {};
  
  ngOnInit(): void {
    this.authService.authChanged.subscribe(response => {this.isAuthenticated = response})
  };

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
