import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ErrorResponse } from 'src/app/model/ErrorResponse';

@Component({
  selector: 'app-error-response',
  templateUrl: './error-response.component.html',
  styleUrls: ['./error-response.component.scss']
})
export class ErrorResponseComponent implements OnInit, OnChanges {

  @Input() errorResponse: ErrorResponse;
  @Input() showElement: boolean;
  className: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.errorResponse) {
      if ( this.errorResponse.statusCode >= 200 && this.errorResponse.statusCode < 300 ) {
        this.className = 'message';
      } else if ( this.errorResponse.statusCode >= 300 && this.errorResponse.statusCode < 400 ) {
        this.className = 'warning';
      } else {
        this.className = 'error';
      }
    }
  }
}
