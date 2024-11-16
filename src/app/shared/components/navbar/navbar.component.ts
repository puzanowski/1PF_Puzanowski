import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav; 
  sidenavOpened = true;
  isAdmin: boolean = false;
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUser as User;
    this.isAdmin = this.currentUser?.role === 'admin';
  }
}
