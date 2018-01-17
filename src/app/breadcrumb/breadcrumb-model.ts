//import {BreadcrumbDropDownItem} from "./breadcrumb.service";
import {Params} from "@angular/router";
import {Observable} from "rxjs/Observable";

export interface Breadcrumb {
  class?: string;
  label: string|Observable<string>;
  icon?: string;
  hide?: boolean
  dropDown?: BreadcrumbDropDown
}

export interface BreadcrumbDropDown {
  popupTitle?: string;
  items?: BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
  getItems?: () => BreadcrumbDropDownItem[] |  Observable<BreadcrumbDropDownItem[]>;
}


export interface BreadcrumbDropDownItem {
  label: string;
  url: string;
  icon?: string;
  params?: Params;
  disabled?: boolean
}

export interface BreadcrumbRoute {
  breadcrumb: Breadcrumb
  url: string;
  params: Params;
}
