import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() navbarComponent!: NavbarComponent; 
  title = 'Gestión de Alumnos';

  toggleSidenav() {
    this.navbarComponent.toggleSidenav();
  }
}