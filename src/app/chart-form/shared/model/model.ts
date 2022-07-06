export interface ChartAxisPoint {
  pointNumber: number;
  xAxis: number;
  yAxis: number;
}

export interface ChartPointModel {
  point: ChartAxisPoint;
}

export interface TabModel {
  points: ChartPointModel[];
}

export interface TabData {
  tabName: string;
  tab: TabModel[];
}

export interface TabsModel {
  tabs: TabData[];
}
