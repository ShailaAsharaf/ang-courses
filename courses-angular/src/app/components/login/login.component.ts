import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  login(): void {
    if (this.authService.login(this.loginForm.value.email, this.loginForm.value.password)) {
      this.authService.updateData('isLoggedIn');
      this.router.navigate(['dash/profile'])
    } else {
      // Handle unsuccessful login
      const daialogRef = this.dialog.open(PopupComponent, {
        width: '300px',
        data: {
          mode: 'loginFailed',
        },
      });
    }
  }
}
