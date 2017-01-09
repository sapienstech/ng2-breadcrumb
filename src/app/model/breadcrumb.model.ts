
import {Params} from "@angular/router";
export const BREADCRUMB_DATA_KEY = "breadcrumb";
export interface BreadcrumbData {
  label: string;
  icon: string;
  popupTitle: string;
  getBreadCrumbData?: () => BreadcrumbDropDownData[];
  hide?: boolean
  breadcrumbDropDownData: BreadcrumbDropDownData[];

}
export interface BreadcrumbDropDownData {
  label: string;
  url: string;
  icon: string;
  params?: Params;
}
export interface Breadcrumb {
  breadcrumbData: BreadcrumbData
  url: string;
  params: Params;
}
