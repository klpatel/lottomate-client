import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService} from './core/backend/backend.service';
import { NewUser } from './model/NewUser';
import { User } from './model/User';

@Injectable({
    providedIn: 'root'
  })

  export class AppService {
  
    constructor(private service: BackendService) { }
  
    public singon<T>(params: NewUser): Observable<T> {
      return this.service.postRequest<T>('/Account/register', params);
    }
  
    public singin<T>(params: User): Observable<T> {
      return this.service.postRequest<T>('/Account/login', params);
    }
}