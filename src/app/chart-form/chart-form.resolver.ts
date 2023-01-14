import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TabsModelMongoDBResponse } from '../chartAPI/model/ChartAPI.model';
import { ChartAPIService } from '../chartAPI/service/chart-api.service';
import { GlobalVariable } from '../shared/global-property';

@Injectable({
  providedIn: 'root',
})
export class ChartFormResolver implements Resolve<TabsModelMongoDBResponse> {
  constructor(private chartAPIService: ChartAPIService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TabsModelMongoDBResponse> {
    return this.chartAPIService.getOnePost(GlobalVariable.CHART_ID);
  }
}
