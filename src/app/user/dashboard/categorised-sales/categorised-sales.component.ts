import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { AppConstants } from '../../../core/constants';
import { ErrorResponse } from '../../../model/ErrorResponse';
import { Token } from '../../../model/Token';
import { UserService } from '../../../user/user.service';
import { CategorisedSalesMaster } from 'src/app/model/CategorisedSalesMaster';
import { CategorisedSalesDetail } from 'src/app/model/CategorisedSalesDetail';
import { FormControl, Validators } from '@angular/forms';

interface Total { grandtotal: number };
type CatGameOrTotal = CategorisedSalesDetail | Total;

@Component({
  selector: 'app-categorised-sales',
  templateUrl: './categorised-sales.component.html',
  styleUrls: ['./categorised-sales.component.scss']
})

export class CategorisedSalesComponent implements OnInit {
  catSalesMaster: CategorisedSalesMaster;       //header
  errorResponse: ErrorResponse;                 //for error
  savingForm: boolean;
  displayedColumnsCredit = ['no', 'categoryName', 'total'];
  displayedColumnsDebit = ['no', 'categoryName', 'total'];
  creditDataSource: CatSalesDataSource;
  debitDataSource: CatSalesDataSource;
  userName: string;
  editMode:boolean;

  constructor(
      private userService: UserService,
      private router: Router,
    ) 
  {
    debitTotalField: new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.getCategorisedSales();
  }
  /*for loading data into header and both mat tables */
  getCategorisedSales(): void {
    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    this.userName = token.username;
    this.userService.getCategorisedSales<CategorisedSalesMaster>(token.storeId)
      .subscribe(
        (response: CategorisedSalesMaster) => {
          this.catSalesMaster = response;
          //this.errorResponse = !this.business && {statusCode: 204, errors: [{message: 'No business info found'}]};
          this.creditDataSource = new CatSalesDataSource();
          this.creditDataSource.use(this.catSalesMaster.creditSalesDetail)
          this.creditDataSource.data = this.catSalesMaster.creditSalesDetail;

          this.debitDataSource = new CatSalesDataSource();
          this.debitDataSource.use(this.catSalesMaster.debitSalesDetail)
          this.debitDataSource.data = this.catSalesMaster.debitSalesDetail;

        },
        (error: ErrorResponse) => {
          this.errorResponse = error;
        });
  }
  public calculateCreditTotal() {
    return this.catSalesMaster?.creditSalesDetail.reduce((accum, curr) =>
      accum + curr.total, 0);
  }
  public calculateDebitTotal() {
    return this.catSalesMaster?.debitSalesDetail.reduce((accum, curr) =>
      accum + curr.total, 0);
  }

  save(): void {
    this.savingForm = false;
    this.savingForm = this.isDataValid(); //validating data

    if (this.savingForm) {
      this.userService.saveCategorisedSales<CategorisedSalesMaster>(this.catSalesMaster)
        .subscribe((response: any) => {
          this.errorResponse = { statusCode: 200, errors: [{ message: 'Categorised Sales saved!' }] };
          this.savingForm = true;
        },
          (error: ErrorResponse) => {
            this.errorResponse = error;
            this.savingForm = false;
          });
    }
    else
    {
        this.errorResponse = {statusCode: 0,errors : [{message: 'Total cannot be negative'}]};
    }
      
    // if (this.savingForm)
    //   this.router.navigate(['user/welcomedashboard']);
  }

  //validating -- total should not be negative
  isDataValid(): boolean {
    var crAmt = this.catSalesMaster.creditSalesDetail;
    var drAmt = this.catSalesMaster.debitSalesDetail;
  
    for (let i in crAmt) {
      if (crAmt[i].total < 0)
        return false;
    }
    for (let j in drAmt)
    {
      if(drAmt[j].total < 0)
        return false;
    }
    return true;
  }

  //making readonly field for debit "Instance Gross Sale-- Instance Daily Game sale Total"
  toggleEdit(index){
    if(index == 2)
      this.editMode=true;
    else
      this.editMode=false;
  }
  
}
/** class is used for datasource Observable, to calculate total */
export class CatSalesDataSource extends MatTableDataSource<CatGameOrTotal>{
  dataWithTotal = new BehaviorSubject<CatGameOrTotal[]>([]);

  use(catGames: CategorisedSalesDetail[]) {
    this.dataWithTotal.next([...catGames]);
  }
}

