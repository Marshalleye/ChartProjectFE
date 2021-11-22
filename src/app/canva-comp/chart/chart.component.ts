import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartData } from '../table/table.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [''];
  public barChartLegend = false;
  public barChartData = [{ data: [0], label: 'Series A' }];

  @Input() set dataSource(data: ChartData[] | any) {
    if (data) {
      this.setChartData(data);
    } else {
      return;
    }
  }
  constructor() {}

  ngOnInit(): void {}

  setChartData(arr: any) {
    this.barChartData[0].data = [];
    this.barChartLabels = [];
    for (let index = 0; index < arr.length; index++) {
      this.barChartData[0].data.push(arr[index]['yAxis']);
      this.barChartLabels.push(arr[index]['xAxis']);
    }
  }
}
