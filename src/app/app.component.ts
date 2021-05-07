import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CALCULATOR';
  adminMode = false;
  switchAdminMode() {
    this.adminMode = !this.adminMode;
  }
}
