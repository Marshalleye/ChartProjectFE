import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChartAPIService } from '../chartAPI/service/chart-api.service';
import { TabsModel } from './shared/model/tabs.model';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.scss'],
})
export class ChartFormComponent implements OnInit {
  public dataSource$: Observable<TabsModel>;
  public mainChartForm: FormGroup;
  public tabNameInput = new FormControl('First Chart');
  public tabsNameArr: string[] = ['First Chart'];

  get tabNameInputValue(): string {
    return this.tabNameInput.value;
  }

  constructor(private chartAPIService: ChartAPIService) {}

  public ngOnInit(): void {
    this.mainChartForm = new FormGroup({
      tabs: new FormArray([this.initTab()]),
    });

    this.dataSource$ = this.mainChartForm.valueChanges;
    this.chartAPIService.getAllPost().subscribe(console.log);
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

  public onSubmit(form: FormGroup): void {}

  public isTabNameExist(tabName: string): boolean {
    return this.tabsNameArr.some((tab: string) => tabName === tab);
  }

  private initTab(): FormGroup {
    return new FormGroup({
      tabName: new FormControl(this.tabNameInputValue),
      pointsInTab: new FormArray([this.initPointInTab()]),
    });
  }

  private initPointInTab(): FormGroup {
    return new FormGroup({
      point: new FormControl(),
    });
  }
}
