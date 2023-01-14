import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TabsModel } from 'src/app/chart-form/shared/model/tabs.model';
import { GlobalVariable } from 'src/app/shared/global-property';
import { TabsModelMongoDBResponse } from '../model/ChartAPI.model';

@Injectable({
  providedIn: 'root',
})
export class ChartAPIService {
  private apiChartUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: HttpClient) {}

  public createPost(chartParams: TabsModel): Observable<any> {
    return this.http.post(this.apiChartUrl, chartParams).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getAllPost(): Observable<TabsModelMongoDBResponse> {
    return this.http.get<TabsModelMongoDBResponse>(this.apiChartUrl).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getOnePost(getParamsId: string): Observable<TabsModelMongoDBResponse> {
    return this.http
      .get<TabsModelMongoDBResponse>(this.apiChartUrl + getParamsId)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public updatePost(
    _id: string,
    post: TabsModel
  ): Observable<TabsModelMongoDBResponse> {
    return this.http
      .put<TabsModelMongoDBResponse>(
        this.apiChartUrl,
        this.mapDataForPostRequest(post, _id)
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public deletePost(
    deleteParamsId: string
  ): Observable<TabsModelMongoDBResponse> {
    return this.http
      .delete<TabsModelMongoDBResponse>(this.apiChartUrl + deleteParamsId)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  private mapDataForPostRequest(
    form: TabsModel,
    _id: string
  ): TabsModelMongoDBResponse {
    return {
      _id: _id,
      tabs: form.tabs,
    };
  }
}
