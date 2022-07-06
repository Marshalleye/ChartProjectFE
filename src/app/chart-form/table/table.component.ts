import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ChartAxisPoint,
  ChartPointModel,
  TabModel,
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

  public tableData: ChartPointModel[];

  public displayedColumns: string[] = ['pointNumber', 'xAxis', 'yAxis'];

  private tableDataMapper(tableData: TabsModel): ChartPointModel[] {
    return tableData.tabs[this.tabNumber].tab[0].points.map(
      (tablePoint: ChartPointModel) => {
        return tablePoint;
      }
    );
  }
}
