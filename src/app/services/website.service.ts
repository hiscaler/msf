import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Website } from "../models/Website";
import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { ResponseBody } from "./response-body.service";
import { catchError } from "rxjs/operators";
import { HttpErrorHandler } from "../handlers/HttpErrorHandler";

@Injectable({
  providedIn: 'root'
})

export class WebsiteService {

  private endpoint = 'tj/website/index';


  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
  }

  getWebsites(): Observable<ResponseBody> {
    return this.http.get<ResponseBody>(this.endpoint);
  }

  private static parseFormData(formData: FormGroup): HttpParams {
    return new HttpParams()
      .append('domain', formData.get('domain').value)
      .append('enabled', formData.get('enabled').value ? '1' : '0');
  }

  /**
   * Create a new record
   * @param formData
   */
  create(formData: FormGroup): Observable<any> {
    return this.http.post('tj/website/create', WebsiteService.parseFormData(formData));
  }

  /**
   * Update record.
   * @param id
   * @param formData
   */
  update(id: number, formData: FormGroup): Observable<ResponseBody> {
    return this.http.post<ResponseBody>(`tj/website/update?id=${id}`, WebsiteService.parseFormData(formData));
  }

  view(id: number): Observable<ResponseBody> {
    return this.http.get<any>(`tj/website/view?id=${id}`);
  }

  /**
   * Delete record.
   * @param id
   */
  delete(id: number): Observable<any> {
    return this.http.post<ResponseBody>(`tj/website/delete?id=${id}`, null).pipe(
        catchError(this.httpErrorHandler.handleError('Delete website.', []))
      );
  }


}
