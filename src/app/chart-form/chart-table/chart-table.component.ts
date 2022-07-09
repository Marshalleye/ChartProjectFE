import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ChartAxisPoint,
  ChartPointControlModel,
  TabsModel,
} from '../shared/model/tabs.model';

@Component({
  selector: 'app-chart-table',
  templateUrl: './chart-table.component.html',
  styleUrls: ['./chart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTableComponent {
  @Input() public tabNumber: number;
  @Input() public set dataSource(tableData: TabsModel | null) {
    if (!tableData) {
      return;
    }
    this.tableData = this.tableDataMapper(tableData);
  }

  public tableData: ChartAxisPoint[];

  public displayedColumns: string[] = ['pointNumber', 'xAxis', 'yAxis'];

  private tableDataMapper(tableData: TabsModel): ChartAxisPoint[] {
    return tableData.tabs[this.tabNumber].pointsInTab.map(
      ({ point }: ChartPointControlModel) => {
        return point;
      }
    );
  }
}
