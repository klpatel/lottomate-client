import {  Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorResponse } from 'src/app/model/ErrorResponse';
import { GameMaster } from 'src/app/model/GameMaster';

import { AppConstants } from '../../core/constants';
import { Token } from '../../model/Token';
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root'
})

export class GameService {
  errorResponse: ErrorResponse;
  games$: BehaviorSubject<GameMaster[]>;
  gameMasters: Array<GameMaster> = [];
  
  constructor(private userService: UserService)    
              { 
                this.games$ = new BehaviorSubject([]) 
              }


  getAllGames(): void {
    
    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    this.userService.getGames<GameMaster[]>(token.storeId)
      .subscribe(
        response => {
          this.gameMasters = response;
          this.games$.next(this.gameMasters);
        },
        (error: ErrorResponse) => {
          this.errorResponse = error;
          this.errorResponse = { statusCode: error.statusCode, errors: [{ message: error.errors[0].message[0] }] };
        });

  }
 
  edit(gameMaster:GameMaster)
  {
    this.userService.editGame(gameMaster)
    .subscribe( (res: GameMaster) => {
      this.getAllGames();
    },
      (error: ErrorResponse) => {
        this.errorResponse = error;
        
      });
  }
  addNewGame(gameMaster:GameMaster)
  {
    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    gameMaster.storeId = token.storeId;
    console.log('in GameService' + gameMaster);
    this.userService.addGame(gameMaster)
    .subscribe((res:GameMaster) => {
      this.getAllGames();
    },
    (error:ErrorResponse) => {
      this.errorResponse=error;
    });
    
  }


}
