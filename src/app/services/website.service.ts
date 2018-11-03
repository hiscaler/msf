import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Website } from "../models/Website";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class WebsiteService {

  private endpoint = environment.apiPrefix + 'tj/website/index';

  constructor(private http: HttpClient) {
  }

  getWebsites(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }

  create(website: Website): Observable<any> {
    return this.http.post<Website>(this.endpoint, website);
  }

  update(website: Website): Observable<Website> {
    return this.http.post<Website>(this.endpoint, website);
  }

  delete(website: Website): Observable<Website> {
    return this.http.post<Website>(this.endpoint, website);
  }


}
