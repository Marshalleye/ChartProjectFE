import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TabsModel } from './shared/model/model';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.scss'],
})
export class ChartFormComponent implements OnInit {
  public dataSource$: Observable<TabsModel>;
  public selectedMatGroup = 0;
  public mainChartForm: FormGroup;
  public tabNameInput = new FormControl('First Chart');
  public tabsNameArr: string[] = ['First Chart'];

  get tabNameInputValue(): string {
    return this.tabNameInput.value;
  }

  public ngOnInit(): void {
    this.mainChartForm = new FormGroup({
      tabs: new FormArray([this.initTab()]),
    });

    this.dataSource$ = this.mainChartForm.valueChanges;
  }

  public addTab(selectAfterAdding: boolean): void {
    if (this.tabNameInputValue) {
      this.tabsNameArr.push(this.tabNameInputValue.toString().trim());

      const control = <FormArray>this.mainChartForm.get('tabs');

      control.push(this.initTab());
    }

    if (selectAfterAdding) {
      this.tabNameInput.setValue(this.tabsNameArr.length - 1);
    }
  }

  public addPoint(tabsIndex: number, tabIndex: number): void {
    const control = (
      (this.mainChartForm.get('tabs') as FormArray).controls[tabsIndex].get(
        'tab'
      ) as FormArray
    ).controls[tabIndex].get('points') as FormArray;

    control.push(this.initPoint());
  }

  public getTabs(form: FormGroup): FormGroup[] {
    return (form.controls.tabs as FormArray).controls as Array<FormGroup>;
  }
  public getTab(form: FormGroup): FormGroup[] {
    return (form.controls.tab as FormArray).controls as Array<FormGroup>;
  }
  public getPoints(form: FormGroup): FormGroup[] {
    return (form.controls.points as FormArray).controls as Array<FormGroup>;
  }

  public removeTab(tabsIndex: number): void {
    const control = <FormArray>this.mainChartForm.get('tabs');

    control.removeAt(tabsIndex);

    this.tabsNameArr.splice(tabsIndex, 1);
  }

  public removePoints(
    tabsIndex: number,
    tabIndex: number,
    pointIndex: number
  ): void {
    const control = <FormArray>(
      this.mainChartForm.get(['tabs', tabsIndex, 'tab', tabIndex, 'points'])
    );

    control.removeAt(pointIndex);
  }

  public changeMatGroup(): void {
    this.tabNameInput.reset();
  }

  public onSubmit(form: FormGroup): void {}

  public isTabNameExist(tabName: string): boolean {
    return this.tabsNameArr.some((tab: string) => tabName === tab);
  }

  private initTab(): FormGroup {
    return new FormGroup({
      tabName: new FormControl(this.tabNameInputValue),
      tab: new FormArray([this.initPoints()]),
    });
  }
  private initPoints(): FormGroup {
    return new FormGroup({
      points: new FormArray([this.initPoint()]),
    });
  }

  private initPoint(): FormGroup {
    return new FormGroup({
      point: new FormControl(),
    });
  }
}
