import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { GameBook } from 'src/app/model/GameBook';
import { GameBookService } from '../../services/gamebook.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../../user.service';
import { ErrorResponse } from 'src/app/model/ErrorResponse';

@Component({
  selector: 'app-game-book',
  templateUrl: './game-book.component.html',
  styleUrls: ['./game-book.component.scss']
})
export class GameBookComponent implements OnInit, OnDestroy, AfterViewInit  {
  errorResponse: ErrorResponse;
  public displayedColumns: string[] = ['gameNumber', 'name', 'displayNumber', 
                          'bookNumber', 'activateDate','settleDate',
                          'isActive'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  public dataSource: MatTableDataSource<GameBook>;
  private serviceSubscribe: Subscription;

  constructor(private gameBookService: GameBookService, 
              private userService: UserService) 
              {
                  this.dataSource = new MatTableDataSource<GameBook>();
              }

  ngOnInit(): void {
    this.gameBookService.getAllGamesBook();
    this.serviceSubscribe = this.gameBookService.books$.subscribe(res => 
                            this.dataSource.data = res);
  }
  ngAfterViewInit(): void {
    this.errorResponse = undefined;
  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}
