import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { ChartData } from './table/table.component';

@Component({
  selector: 'app-canva-comp',
  templateUrl: './canva-comp.component.html',
  styleUrls: ['./canva-comp.component.scss'],
})
export class CanvaCompComponent implements OnInit {
  myChartForm: FormGroup;
  dataSource: Observable<ChartData[]>;
  localStorageData: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myChartForm = this.fb.group({
      points: this.fb.array([], Validators.required),
    });
    this.dataSource = this.pointsForms.valueChanges;
    //this.getLocalData();
  }

  get pointsForms() {
    return this.myChartForm.get('points') as FormArray;
  }

  get pointNumber() {
    return this.myChartForm.get('pointNumber');
  }

  getLocalData() {
    if (localStorage.getItem('points') !== null) {
      this.localStorageData = localStorage.getItem('points');
      const a = JSON.parse(this.localStorageData);
      this.dataSource = of(a);
      this.dataSource.subscribe(console.log);
    } else {
      this.dataSource = this.pointsForms.valueChanges;
    }
  }

  add(): void {
    const arr = this.fb.group({
      pointNumber: [],
      xAxis: [null, Validators.required],
      yAxis: [null, Validators.required],
    });
    this.pointsForms.push(arr);
    //if (this.pointsForms?.get('xAxis')?.value !== null) {
    //  localStorage.setItem('points', JSON.stringify(this.pointsForms.value));
    //} else {
    //  return;
    //}
  }

  deletePoint(i: number) {
    this.pointsForms.removeAt(i);
    localStorage.setItem('points', JSON.stringify(this.pointsForms.value));
  }

  submit() {}
}
