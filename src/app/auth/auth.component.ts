import { Component, OnInit, Input } from '@angular/core';

//import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Input() totalSqFt: number;
  email: string;
  emailvalid: boolean;

  constructor(public auth: AuthenticationService) {
    this.emailvalid = false;
   }

  ngOnInit(): void {
  }

  
  validateEmail(email) {
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
      //this.emailvalid = true;
      this.emailvalid = true;
    } else {
      //this.emailvalid = false;
      this.emailvalid = false;
    }
    console.log(this.emailvalid);
  }

  submitemail() {
    console.log(this.emailvalid, this.email);
    this.auth.submitEmail(this.email, this.totalSqFt);
  }
}
