//core and common module 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

//material design and shared feature module 
import { GenericModule } from '../core/generic/generic.module';
import { MaterialModule } from '../shared/material.module';
import { MatInputModule } from '@angular/material/input';




//feature component
import { DashBoardComponent } from './dashboard/dashboard.component';
import { WelcomedashboardComponent } from './dashboard/welcomedashboard/welcomedashboard.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
import { ToolbarComponent } from './dashboard/toolbar/toolbar.component';
import { DailyGameSalesComponent } from './dashboard/daily-game-sales/daily-game-sales.component';
import { CategorisedSalesComponent } from './dashboard/categorised-sales/categorised-sales.component';
import { UserregisterComponent } from './dashboard/userregister/userregister.component';
import { SalesReportsComponent } from './dashboard/sales-reports/sales-reports.component';
import {GameComponent} from './dashboard/game/game.component';
import{EditgameComponent} from './dashboard/game/game-dialog/edit-game/editgame.component'
import {ConfirmDialogComponent} from './dashboard/game/game-dialog/confirm-dialog/confirm-dialog.component'
import{AddgameComponent} from './dashboard/game/game-dialog/add-game/addgame.component'
import { GameBookComponent } from './dashboard/game-book/game-book.component';

const routes: Routes = [
  {
    path: 'user', redirectTo: '/user/dashboard', pathMatch: 'full'
  },
  {
    path: '', component: DashBoardComponent,
    children: [
      { path: 'welcomedashboard', component: WelcomedashboardComponent },
      { path: 'dailygamesales', component: DailyGameSalesComponent },
      {path:'dailycategorisedsales',component:CategorisedSalesComponent},
      { path: 'registerUser', component: UserregisterComponent },
      { path: 'salesReports', component: SalesReportsComponent },
      { path: 'game', component: GameComponent },
      { path: 'gamebook', component: GameBookComponent },
     
    ]
  },

];

@NgModule({
  
  declarations: [
    DashBoardComponent,
    WelcomedashboardComponent,
    SidenavComponent,
    ToolbarComponent,
    DailyGameSalesComponent,
    CategorisedSalesComponent,
    UserregisterComponent,
    SalesReportsComponent,
    GameComponent,
    EditgameComponent,
    ConfirmDialogComponent,
    AddgameComponent,
    GameBookComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    FormsModule,ReactiveFormsModule,
    GenericModule,
    RouterModule.forChild(routes),
  
  ],
  entryComponents: [ConfirmDialogComponent,EditgameComponent],
  exports: [RouterModule,GenericModule],

})

export class UserRoutingModule { }
