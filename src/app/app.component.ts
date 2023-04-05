import { Component, OnDestroy } from '@angular/core';
import { AppConstants } from './core/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LottoWebUI';

  ngOnDestroy(): void 
  {
    localStorage.removeItem(AppConstants.USER_TOKEN);
    localStorage.removeItem(AppConstants.USER_INFO);
  }
}
