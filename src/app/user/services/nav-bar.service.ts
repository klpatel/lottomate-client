import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/core/constants';
import { Token } from 'src/app/model/Token';


export class MenuItem {
  path: string;
  title: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  activeMenuItem$: Observable<MenuItem>;
    
  constructor() { 
    
  }
  
  getNavForUser(): MenuItem[] {
    
    if (this.userUserInRole('ClientUser')) {
      return [
      { title: 'Instance Daily Game Sales', path: 'dailygamesales' },
      { title: 'Instance Daily Total Sales', path: 'welcomedashboard' },
      { title: 'Daily Categorised Sales', path:'dailycategorisedsales' },
      { title: 'Daily Sales Report', path: 'salesReports' }
      ];

    } else if (this.userUserInRole('ClientAdmin')) {
      return [
        { title: 'Instance Daily Game Sales', path: 'dailygamesales' },
        { title: 'Instance Daily Total Sales', path: 'welcomedashboard' },
        { title: 'Daily Categorised Sales', path:'dailycategorisedsales' },
        { title: 'Daily Sales Report', path: 'salesReports' },
        { title: 'Register User', path: 'registerUser' },
        { title: 'Game Master', path: 'game' },
        { title: 'Game Book', path: 'gamebook' }
        ];
      
    } else if (this.userUserInRole('SysAdmin')) {
      return [
        { title: 'Instance Daily Game Sales', path: 'dailygamesales' },
        { title: 'Instance Daily Total Sales', path: 'welcomedashboard' },
        { title: 'Daily Categorised Sales', path:'dailycategorisedsales' },
        { title: 'Daily Sales Report', path: 'salesReports' },
        { title: 'Register User', path: 'registerUser' },
        { title: 'Game Master', path: 'game' },
        { title: 'Game Book', path: 'gamebook' }
        ];
    }
    return [];
  }

  userUserInRole(role : string)
  {
    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    if(token != null)
      return token.roles.find(x=>x === role);
    return false;
  }
}
