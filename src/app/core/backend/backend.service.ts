import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  defaultOptions = {
    responseType: 'json'
  };

  constructor(private http: HttpClient) { }

  public getBaseURL(): string {
    return (environment.mockable) ? environment.mockBaseURL : environment.backendBaseURL;
  }

  public getRequest<T>(path: string, params?: QueryParameters, options?: any): Observable<any>  {
    const url = UrlBuilder.build(this.getBaseURL(), path, params);
    return this.http.get<T>(url, options ? options : this.defaultOptions);
  }

  public postRequest<T>(path: string, data: any, options?: any): Observable<any> {
    const url = UrlBuilder.build(this.getBaseURL(), path);
    return this.http.post<T>(url, data, options ? options : this.defaultOptions);
  }

  public putRequest<T>(path: string, data: any, options?: any): Observable<any> {
    const url = UrlBuilder.build(this.getBaseURL(), path);
    return this.http.put(url, data, options ? options : this.defaultOptions);
  }

  public deleteRequest<T>(path: string, params?: QueryParameters, options?: any): Observable<any> {
    const url = UrlBuilder.build(this.getBaseURL(), path, params);
    return this.http.delete(url, options ? options : this.defaultOptions);
  }
}

export class QueryParameters {
  private parameters: string[];

  constructor() {
    this.parameters = [];
  }

  public push(key: string, value: any): void {
    const param = encodeURIComponent(value.toString());
    this.parameters.push([key, param].join('='));
  }

  public getQueryString = (): string => this.parameters.join('&');
}

class UrlBuilder {

  constructor() { }

  public static build(baseURL: string, path: string, parameters?: QueryParameters): string {
    const url = path.startsWith('http') ? path : [baseURL, path].join('');
    const queryString: string = parameters ? parameters.getQueryString() : null;
    return queryString ? `${url}?${queryString}` : url;
  }
}
