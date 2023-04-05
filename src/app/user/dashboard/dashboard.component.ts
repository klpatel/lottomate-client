import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-app',
  template: `
          <app-sidenav></app-sidenav>
  `,
  styles: [
  ]
})
export class DashBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}