import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Website } from "../models/Website";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class WebsiteService {

  private endpoint = 'tj/website/index';

  constructor(private http: HttpClient) {
  }

  getWebsites(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }

  create(formData: FormGroup): Observable<any> {
    const data = new HttpParams()
      .append('domain', formData.get('domain').value)
      .append('enabled', formData.get('enabled').value ? '1' : '0');

    return this.http.post<Website>('tj/website/create', data);
  }

  update(website: Website): Observable<Website> {
    console.info(website)
    return this.http.post<Website>('tj/website/update', website);
  }

  delete(website: Website): Observable<Website> {
    return this.http.post<Website>(this.endpoint, website);
  }


}
