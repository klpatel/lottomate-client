import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { AppConstants } from 'src/app/core/constants';
import { Token } from 'src/app/model/Token';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  @Output() toggleSidenav = new EventEmitter<void>();
   username:string ;
  constructor(
          private userService:UserService,
          private router: Router,
          private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    this.username = token.username;
  }

  logout(): void {
    this.userService.logoutUser().subscribe( () => {
      this.showSnackBar('You have logged out successfully!');
      localStorage.removeItem(AppConstants.USER_TOKEN);
      //localStorage.removeItem(AppConstants.USER_INFO);
      this.router.navigate(['login']);
    },
    () => {
      this.showSnackBar(AppConstants.WARNIGN_ERROR_MESSAGE);
      localStorage.removeItem(AppConstants.USER_TOKEN);
      //localStorage.removeItem(AppConstants.USER_INFO);
      this.router.navigate(['login']);
    });
  }

  showSnackBar(message: string): void {
    const horizontal: MatSnackBarHorizontalPosition = 'center';
    const vertical: MatSnackBarVerticalPosition = 'top';
    this.matSnackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: horizontal,
      verticalPosition: vertical,
    });
  }

}
