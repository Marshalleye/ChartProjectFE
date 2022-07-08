import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ChartAxisPoint,
  ChartPointControlModel,
  TabsModel,
} from '../shared/model/model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
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
