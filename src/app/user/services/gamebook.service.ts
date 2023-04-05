import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorResponse } from 'src/app/model/ErrorResponse';
import { GameBook } from 'src/app/model/GameBook';
import { AppConstants } from '../../core/constants';
import { Token } from '../../model/Token';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root'
})
export class GameBookService {
    errorResponse: ErrorResponse;
    books$: BehaviorSubject<GameBook[]>;
    gameBooks: Array<GameBook> = [];

    constructor(private userService: UserService) {
        this.books$ = new BehaviorSubject([])
    }

    getAllGamesBook(): void {

        const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
        this.userService.getGamesBook<GameBook[]>(token.storeId)
            .subscribe(
                response => {
                    this.gameBooks = response;
                    this.books$.next(this.gameBooks);
                },
                (error: ErrorResponse) => {
                    this.errorResponse = error;
                    this.errorResponse = { statusCode: error.statusCode, errors: [{ message: error.errors[0].message[0] }] };
                });

    }

}
