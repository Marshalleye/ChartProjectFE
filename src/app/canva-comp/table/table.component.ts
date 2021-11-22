import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

export interface ChartData {
  pointNumber: number;
  xAxis: number;
  yAxis: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['pointNumber', 'xAxis', 'yAxis'];

  @Input() dataSource: ChartData[] | any;
  constructor() {}

  ngOnInit(): void {}
}
