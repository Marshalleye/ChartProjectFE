import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ChartPointControlModel,
  TabData,
  TabsModel,
} from '../shared/model/tabs.model';
import { chartConfigProperty } from './model/chart-config';
import { ChartAxisData, ChartDataCollectionModel } from './model/chart-model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  public readonly chartPropertyConfig = chartConfigProperty;
  public view: [number, number] = [1000, 600]; //width, height
  @Input() set dataSource(data: TabsModel | null) {
    if (data) {
      this.setChartData(data);
    } else {
      return;
    }
  }
  @Input() public tabName: string[];

  public chartDataCollection: ChartDataCollectionModel[] = [
    {
      name: 'Default',
      series: this.initChartAxisData(),
    },
  ];

  public onResize(event: Event): void {
    this.view = [(event.target as Window).innerWidth / 1.35, 400];
  }

  private setChartData({ tabs }: TabsModel): void {
    for (let i = 0; i < tabs.length; i++) {
      this.chartDataCollection.splice(i, 1, this.chartMapper(tabs[i]));
    }
    this.chartDataCollection = [...this.chartDataCollection];
  }

  private chartMapper(item: TabData): ChartDataCollectionModel {
    return {
      name: item.tabName,
      series: this.pointsMapper(item.pointsInTab),
    };
  }

  private pointsMapper(pointsArray: ChartPointControlModel[]): ChartAxisData[] {
    if (!pointsArray.length) {
      return this.initChartAxisData();
    }

    return pointsArray.map(({ point }: ChartPointControlModel) => {
      return {
        name: point?.xAxis ?? 0,
        value: point?.yAxis ?? 0,
      };
    });
  }

  private initChartAxisData(): ChartAxisData[] {
    return [
      {
        name: 0,
        value: 0,
      },
    ];
  }
}
