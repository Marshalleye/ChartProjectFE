import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TabsModel } from 'src/app/chart-form/shared/model/tabs.model';
import { TabsModelMongoDBResponse } from '../model/ChartAPI.model';

@Injectable({
  providedIn: 'root',
})
export class ChartAPIService {
  private apiChartUrl =
    'https://enigmatic-springs-55944.herokuapp.com/api/chart/';
  constructor(private http: HttpClient) {}

  public createPost(chartParams: TabsModel): Observable<any> {
    return this.http.post(this.apiChartUrl, chartParams);
  }

  public getAllPost(): Observable<TabsModelMongoDBResponse> {
    return this.http.get<TabsModelMongoDBResponse>(this.apiChartUrl);
  }

  public getOnePost(getParamsId: string): Observable<any> {
    return this.http.get(this.apiChartUrl + getParamsId);
  }

  public updatePost(putParamsId: string, post: TabsModel): Observable<any> {
    return this.http.put(this.apiChartUrl, {
      putParamsId,
      post,
    });
  }

  public deletePost(deleteParamsId: string): Observable<any> {
    return this.http.delete(this.apiChartUrl + deleteParamsId);
  }
}
