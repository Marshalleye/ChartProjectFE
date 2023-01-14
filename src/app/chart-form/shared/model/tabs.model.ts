export interface TabsModel {
  tabs: TabData[];
}

export interface TabData {
  tabName: string;
  pointsInTab: ChartPointControlModel[];
}

export interface ChartPointControlModel {
  point: ChartAxisPoint;
}

export interface ChartAxisPoint {
  pointNumber: number;
  xAxis: number;
  yAxis: number;
}
