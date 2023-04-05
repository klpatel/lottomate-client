import { Component, OnInit, ViewChild } from '@angular/core';
//import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
//import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';

import { AppConstants } from '../../../core/constants';
import { AppService } from '../../../app.service';
import { ErrorResponse } from '../../../model/ErrorResponse';
import { Token } from '../../../model/Token';
import { UserService } from '../../../user/user.service';
import { GameSalesMaster } from 'src/app/model/GameSalesMaster';
import { GameSalesDetails } from 'src/app/model/GameSalesDetails';


interface Total { total: number };

type GameOrTotal = GameSalesDetails | Total;


@Component({
  selector: 'app-daily-game-sales',
  templateUrl: './daily-game-sales.component.html',
  styleUrls: ['./daily-game-sales.component.scss']
})

export class DailyGameSalesComponent implements OnInit {
  gameSalesMaster: GameSalesMaster;
  gameSalesDetails: GameSalesDetails;
  errorResponse: ErrorResponse;
  dailySaleState: number;
  savingForm: boolean;
  displayedColumns = ['no', 'instanceGameBookId', 'gameName', 'price', 'openNo', 'closeNo',
    'totalSale', 'totalSalePrice'];

  //dataSource = new MatTableDataSource<GameSalesDetails>();
  dataSource: GameDataSource;

  constructor(
    private appService: AppService,
    private userService: UserService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.dailySaleState = 0;
    this.getGameSales();
  }

  /**
   * method for filling game mat table
   */

  getGameSales() {

    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    this.userService.getDailyGameSales<GameSalesMaster>(token.storeId, this.dailySaleState)
      .subscribe(
        (response: GameSalesMaster) => {
          this.gameSalesMaster = response;
          //this.errorResponse = !this.business && {statusCode: 204, errors: [{message: 'No business info found'}]};
          //this.dataSource.data = this.gameSalesMaster.salesDetail;

          //new code for observable datasource
          this.dataSource = new GameDataSource();
          this.dataSource.use(this.gameSalesMaster.salesDetail)
          this.dataSource.data = this.gameSalesMaster.salesDetail;
        },
        (error: ErrorResponse) => {
          this.errorResponse = error;
          this.errorResponse = { statusCode: error.statusCode, errors: [{message:error.errors[0].message[0]}]};
          console.log(error.statusCode);
          console.log(error.errors[0].message[0]);
          this.savingForm=false;
        });

  }
  /**
   * calculate methods are used to calcuate total and totalprice for footer row. 
   */
  public calculateTotal() {
    return this.gameSalesMaster.salesDetail.reduce((accum, curr) => accum + (curr.closeNo - curr.openNo), 0);
  }
  public calculateTotalPrice() {
    return this.gameSalesMaster.salesDetail.reduce((accum, curr) =>
      accum + (curr.price) * (curr.closeNo - curr.openNo), 0);
  }

  save(): void {
    this.savingForm = false;
    this.savingForm = this.isDataValid();
    //this.gameSalesMaster.salesDetail = this.dataSource.data;
    //this.gameSalesMaster.salesDetail = this.dataSource;
    if (this.savingForm) {
      this.userService.saveDailyGameSales<GameSalesMaster>(this.gameSalesMaster)
        .subscribe((response: any) => {
          this.errorResponse = { statusCode: 200, errors: [{ message: 'Game Sales saved!' }] };
        },
          (error: ErrorResponse) => {
            this.errorResponse = error;
            this.savingForm = false;
          });
    }
    else {
      this.errorResponse = { statusCode: 0, errors: [{ message: 'OpenNo,CloseNo cannot be negative and Openno must be eqaul or smaller than CloseNo.' }] };
    }
    //if (this.savingForm)
    //this.router.navigate(['user/welcomedashboard']);
  }

  //validating data
  isDataValid(): boolean {
    var sales = this.gameSalesMaster.salesDetail;

    for (let i in sales) {
      if (sales[i].openNo == null || sales[i].closeNo == null || sales[i].closeNo < 0 
            || sales[i].openNo < 0 || sales[i].closeNo < sales[i].openNo)
        return false;
    }

    return true;
  }
}

/** class is used for datasource Observable, to calculate total and total price
 * 
 */
//export class GameDataSource extends DataSource<GameOrTotal> {
export class GameDataSource extends MatTableDataSource<GameOrTotal>{
  dataWithTotal = new BehaviorSubject<GameOrTotal[]>([]);

  use(games: GameSalesDetails[]) {
    //const total = games.reduce((accum, curr) => accum + (curr.closeNo - curr.openNo), 0);
    //this.dataWithTotal.next([ ...games, { total }]);
    this.dataWithTotal.next([...games]);
  }

  /* connect(): Observable<GameOrTotal[]> {
    return this.dataWithTotal.asObservable(); */
}

  //disconnect() {}
//}
