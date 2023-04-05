import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ErrorResponse } from '../../../model/ErrorResponse';
import { ReportType } from 'src/app/model/reportType';
import { DatePipe } from '@angular/common';
import { AppConstants } from 'src/app/core/constants';
import { Token } from 'src/app/model/Token';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss']
})
export class SalesReportsComponent implements OnInit {

  reportForm: FormGroup; 
  errorResponse: ErrorResponse;
  reports: ReportType[];

  reportId: number;
  transDate: Date;
  blob: Blob;

  constructor(
    private service: UserService,
    private fb: FormBuilder, 
    public datepipe: DatePipe  ) 
    {
      this.reportForm = this.fb.group({
      reportField: ['',[Validators.required]],  
      dateField: new FormControl(new Date())
    });
   }

  ngOnInit(): void {
    this.reports = this.getReportTypes();
  }

  getReportTypes(): ReportType[]
  {
    return [
      {id: 1, reportName:"Instance Daily Sales", path:"InstanceSale" },
      {id: 2, reportName:"Daily Categorised Sales", path:"CategorySale" }
    ];
  }

  viewReport(): void
  {
    if (this.reportForm.valid) {
      this.errorResponse = null;

        let path= this.reportForm.value.reportField;
        let  tDate= this.datepipe.transform(this.reportForm.value.dateField, 'yyyy-MM-dd'); 
        const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));

        var url = "/SalesReport/" + path + "/" + token.storeId + "/" + tDate;

        this.downloadDoc(url,path);
        
    }
  }
  downloadDoc(url: string, fileName: string ): void
  {
    this.service.getPdfReport(url).subscribe((data) => {

      this.blob = new Blob([data], {type: 'application/pdf'});
    
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName+".pdf";
      link.click();
    
    });
  }
  openOrDownloadDoc(url: string, fileName: string): void
  {
    this.service.getPdfReport(url)
    .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = fileName + ".pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
        }, 100);
    });
    
  }

}
