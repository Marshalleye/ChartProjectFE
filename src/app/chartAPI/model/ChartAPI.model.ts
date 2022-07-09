import {
  ChartPointControlModel,
  TabData,
  TabsModel,
} from 'src/app/chart-form/shared/model/tabs.model';

export interface TabsModelMongoDBResponse extends TabsModel {
  __v: number;
  _id: string;
}

export interface TabDataMongoDBResponse extends TabData {
  _id: string;
}

export interface ChartPointControlMongoDBResponseModel
  extends ChartPointControlModel {
  _id: string;
}
