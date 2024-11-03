import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav; 
  sidenavOpened = true;

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
