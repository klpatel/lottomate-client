import { Injectable } from '@angular/core';
import { BackendService, QueryParameters } from '../core/backend/backend.service';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { AppConstants } from '../core/constants';
import { Token } from '../model/Token';
import { GameSalesMaster } from '../model/GameSalesMaster';
import { NewUser } from '../model/NewUser';
import { HttpHeaders } from '@angular/common/http';
import { CategorisedSalesMaster } from '../model/CategorisedSalesMaster';
import { GameMaster } from '../model/GameMaster';


@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    constructor(private service: BackendService) { }
  
    /**
     * logout current session user
     */
    public logoutUser<T>(): Observable<T> {
      return this.service.postRequest<T>('/Account/logout', {});
    }
  
    /**
     * logout current session user
     */
    public changePassword<T>(data: any): Observable<T> {
      return this.service.postRequest<T>('/Account/changePassword', data);
    }
  
    /**
     * returns current session user
     */
    public getUser<T>(): Observable<T> {
      const user: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
      const params: QueryParameters = new QueryParameters();
      params.push('id', user.userId);
      return this.service.getRequest<T>('/User', params);
    }

     /**
   * returns collection of DailyGameSales
   */
  public getDailyGameSales<T>(storeId: number, dailySaleState: number): Observable<T> {
    /* const params: QueryParameters = new QueryParameters();
    params.push('dailySaleState', dailySaleState);
    return this.service.getRequest<T>('/DailyGamesSales', params); */
    return this.service.getRequest<T>('/DailyGamesSales/GetTodaysSale/'+ storeId + '/'+ dailySaleState);
  }
  //  /**
  //  * save DailyGameSales 
  //  */
  
  public saveDailyGameSales<T>(gameSalesMaster: GameSalesMaster):Observable<T>{
    return this.service.postRequest<T>('/DailyGamesSales',gameSalesMaster);
  }

  //  /**
  //  * Get list of Stores for a ClientId 
  //  */
  
  public getStores<T>(clientId: number):Observable<T>{
    return this.service.getRequest<T>('/ClientRegister/getStores/'+ clientId);
  }

  public registerUser<T>(params: NewUser): Observable<T> {
    return this.service.postRequest<T>('/Account/register', params);
  }

    /**
   * returns collection of CategorisedSales
   */
  public getCategorisedSales<T>(storeId: number): Observable<T> {
    return this.service.getRequest<T>('/CategorisedSales/GetTodaysSale/'+ storeId);
  }

  public getPdfReport(reportUrl: string) {

    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
      
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': token.accessToken,
      })
    };
    return this.service.getRequest(reportUrl,null,httpOptions);
    
  }
  //  /**
  //  * save CategorisedSales 
  //  */
  public saveCategorisedSales<T>(catSalesMaster: CategorisedSalesMaster):Observable<T>{
    return this.service.postRequest<T>('/CategorisedSales',catSalesMaster);
  }

   /**
   * returns collection of GameMaster
   */
  public getGames<T>(storeId: number): Observable<T> {
    return this.service.getRequest<T>('/Games/GetGames/'+ storeId);
  }

  public editGame<T>(updateGame:GameMaster): Observable<T> {
    return this.service.putRequest<T>('/Games',updateGame);
  }
  public deleteGame<T>(id: number): Observable<T> {
    return this.service.deleteRequest<T>('/Games?id='+ id);
  }
  public addGame<T>(newGame:GameMaster):Observable<T>{
    return this.service.postRequest<T>('/Games',newGame);
  }

  /**
   * returns collection of GamesBook
   */
   public getGamesBook<T>(storeId: number): Observable<T> {
    return this.service.getRequest<T>('/GamesBook/GamesBook/'+ storeId);
  }
  
}