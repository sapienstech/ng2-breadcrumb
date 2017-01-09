//import {BreadcrumbDropDownItem} from "./breadcrumb.service";
import {Params} from "@angular/router";
export interface BreadcrumbDropDown {
  popupTitle?: string;
  items?: BreadcrumbDropDownItem[];
  getItems?: () => BreadcrumbDropDownItem[];
}



export interface Breadcrumb {
  label: string;
  icon: string;
  hide?: boolean
  dropDown?: BreadcrumbDropDown
}


export interface BreadcrumbDropDownItem {
  label: string;
  url: string;
  icon: string;
  params?: Params;
}

export interface BreadcrumbRoute {
  breadcrumb: Breadcrumb
  url: string;
  params: Params;
}
