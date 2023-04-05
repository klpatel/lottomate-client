import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { GameMaster } from 'src/app/model/GameMaster';
import { GameService } from '../../services/game.service';
import { EditgameComponent } from './game-dialog/edit-game/editgame.component';
import { AddgameComponent } from './game-dialog/add-game/addgame.component';
import { ConfirmDialogComponent } from './game-dialog/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../../user.service';
import { ErrorResponse } from 'src/app/model/ErrorResponse';


@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  errorResponse: ErrorResponse;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['gameNumber', 'name', 'price', 'isActive', 'bookTotal'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  public dataSource: MatTableDataSource<GameMaster>;
  private serviceSubscribe: Subscription;
  private matSnackBar: MatSnackBar;

  constructor(private gameService: GameService, 
    public dialog: MatDialog,
    private userService: UserService) {
    this.dataSource = new MatTableDataSource<GameMaster>();
  }

  /**
  * initialize data-table by providing games list to the dataSource.
  */
  ngOnInit(): void {
    this.gameService.getAllGames();
    this.serviceSubscribe = this.gameService.games$.subscribe(res => {
      this.dataSource.data = res;
    })
  
  }
  ngAfterViewInit(): void {
    this.errorResponse = undefined;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onPageChange(page: number = 1): void {
    this.errorResponse = undefined;
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
  edit(data: GameMaster) {
    this.errorResponse = undefined;
    const dialogRef = this.dialog.open(EditgameComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gameService.edit(result);
      }
    });
  }
  
  openAddDialog()
  {
    this.errorResponse = undefined;
    const dialogRef = this.dialog.open(AddgameComponent,{
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.gameService.addNewGame(result)
      }
    });
  }

  delete(id: any) {
    this.errorResponse = undefined;
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    console.log('id :' + id);
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
    //      this.gameService.remove(id);
         this.userService.deleteGame(id)
        .subscribe( () => {
      this.gameService.getAllGames();
      
    },
      (error: ErrorResponse) => {
        this.errorResponse = error;
        console.log(this.errorResponse.errors[0].message);
        
      });
       
        }
      });
  }
}

