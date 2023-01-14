import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { TabsModelMongoDBResponse } from '../chartAPI/model/ChartAPI.model';
//import { CHART_ID } from '../app-routing.module';
import { ChartAPIService } from '../chartAPI/service/chart-api.service';
import { GlobalVariable } from '../shared/global-property';
import {
  ChartPointControlModel,
  TabData,
  TabsModel,
} from './shared/model/tabs.model';

@UntilDestroy()
@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.scss'],
})
export class ChartFormComponent implements OnInit {
  private readonly mongoDBKey = GlobalVariable.CHART_ID;
  public dataSource$: Observable<TabsModel>;
  public mainChartForm: FormGroup;
  public tabNameInput = new FormControl('First Chart');
  public tabsNameArr: string[] = ['First Chart'];
  private userChartId: string;
  public resolverData: TabsModel;
  private isEditMode: boolean;

  get tabNameInputValue(): string {
    return this.tabNameInput.value;
  }

  constructor(
    private chartAPIService: ChartAPIService,
    private router: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.resolverData = this.router.snapshot.data.chartData;
    this.initForm();
    this.mainChartForm.patchValue(this.resolverData);
    this.dataSource$ = this.mainChartForm.valueChanges;
    //this.router.data.subscribe((result) => {
    //  if (result.chartData.tabs) {
    //    this.userChartId = result.chartData._id;
    //    this.tabsNameArr = result.chartData.tabs.map(
    //      (item: TabData) => item.tabName
    //    );
    //    this.mainChartForm
    //      .get('tabs')
    //      ?.setValue(result.chartData.tabs.map((item: TabData) => item));
    //    console.log(this.mainChartForm);
    //  }
    //});
  }

  private mapChartDataResponse(chartData: TabsModelMongoDBResponse): TabsModel {
    return {
      tabs: chartData.tabs.map((item: TabData) => {
        return {
          tabName: item.tabName,
          pointsInTab: item.pointsInTab.map((items: ChartPointControlModel) => {
            return {
              point: {
                pointNumber: items.point.pointNumber,
                xAxis: items.point.xAxis,
                yAxis: items.point.yAxis,
              },
            };
          }),
        };
      }),
    };
  }

  public addTab(): void {
    if (this.tabNameInputValue) {
      this.tabsNameArr.push(this.tabNameInputValue.toString().trim());

      const control = <FormArray>this.mainChartForm.get('tabs');

      control.push(this.initTab());
    }

    this.tabNameInput.reset();
  }

  public addPoint(tabsIndex: number): void {
    const control = (this.mainChartForm.get('tabs') as FormArray).controls[
      tabsIndex
    ].get('pointsInTab') as FormArray;

    control.push(this.initPointInTab());
  }

  public getTabs(form: FormGroup): FormGroup[] {
    return (form.controls.tabs as FormArray).controls as Array<FormGroup>;
  }

  public getPoints(form: FormGroup): FormGroup[] {
    return (form.controls.pointsInTab as FormArray)
      .controls as Array<FormGroup>;
  }

  public removeTab(tabsIndex: number): void {
    const control = <FormArray>this.mainChartForm.get('tabs');

    control.removeAt(tabsIndex);

    this.tabsNameArr.splice(tabsIndex, 1);
  }

  public removePoints(tabsIndex: number, pointIndex: number): void {
    const control = <FormArray>(
      this.mainChartForm.get(['tabs', tabsIndex, 'pointsInTab'])
    );

    control.removeAt(pointIndex);
  }

  public onSubmit(form: FormGroup): void {
    const formValue = form.value;
    this.chartAPIService
      .updatePost(this.mongoDBKey, formValue)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  public isTabNameExist(tabName: string): boolean {
    return this.tabsNameArr.some((tab: string) => tabName === tab);
  }

  private initForm() {
    this.mainChartForm = new FormGroup({
      tabs: new FormArray([this.initTab()]),
      _id: new FormControl(),
      __v: new FormControl(),
    });
  }

  private initTab(): FormGroup {
    return new FormGroup({
      tabName: new FormControl(this.tabNameInputValue),
      pointsInTab: new FormArray([this.initPointInTab()]),
      _id: new FormControl(),
    });
  }

  private initPointInTab(): FormGroup {
    return new FormGroup({
      point: new FormControl(),
      _id: new FormControl(),
    });
  }
}
