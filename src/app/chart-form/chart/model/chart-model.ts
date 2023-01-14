export interface ChartAxisData {
  name: number | string;
  value: number | string;
}

export interface ChartDataCollectionModel {
  name: string;
  series: ChartAxisData[];
}
