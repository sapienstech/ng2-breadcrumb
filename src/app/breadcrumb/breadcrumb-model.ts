//import {BreadcrumbDropDownItem} from "./breadcrumb.service";
import {Params} from "@angular/router";
import {Observable} from "rxjs/Observable";
export interface BreadcrumbDropDown {
  popupTitle?: string;
  items?: BreadcrumbDropDownItem[] | Promise<BreadcrumbDropDownItem[]> | Observable<BreadcrumbDropDownItem[]>;
  getItems?: () => BreadcrumbDropDownItem[] | Promise<BreadcrumbDropDownItem[]> | Observable<BreadcrumbDropDownItem[]>;
}


export interface Breadcrumb {
  label: string|Observable<string>;
  icon?: string;
  hide?: boolean
  dropDown?: BreadcrumbDropDown
}


export interface BreadcrumbDropDownItem {
  label: string;
  url: string;
  icon?: string;
  params?: Params;
}

export interface BreadcrumbRoute {
  breadcrumb: Breadcrumb
  url: string;
  params: Params;
}
