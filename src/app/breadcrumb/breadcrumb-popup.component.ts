import {Component, Input, ElementRef} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {BreadcrumbDropDown, BreadcrumbDropDownItem} from "./breadcrumb-model";

@Component({
  moduleId: "" + module.id,
  selector: 'dcn-breadcrumb-popup',
  styleUrls: ["breadcrumb.component.css"],
  template: `
<div class="popover" >
<button *ngIf="isShowNextArrow"  #btn3 [ngClass]="{'menu-button':true, 'has-no-popup':!isShowBreadcrumbDropDown,'has-popup':isShowBreadcrumbDropDown,'is-active':showPopup}" (click)="setInitialFilter($event)">
  <i class="fa fa-angle-right menu-button-icon"></i>
</button>
  <div *ngIf="showPopup">
                        <span class="breadcrumbPopup">
                          <h4 *ngIf="breadcrumbDropDown.popupTitle">{{breadcrumbDropDown.popupTitle}}</h4>
                          <dcn-search-box class="breadcrumb-popup-search"
                                          [searchData]="search"
                                          [minLength]="0"
                                          (results)="onFilter($event)">
                          </dcn-search-box>
  
                          <div class="breadcrumb-popup-menu">
                              <div *ngFor="let nextLink of filteredItems" class="breadcrumb-popup-menu-item">
                                  <!--*ngIf="nextLink.icon"-->
                                  <a [routerLink]="[nextLink.url, nextLink.params?nextLink.params:{}]"
                                     class="breadcrumb-popup-link">
                                  <i class="{{nextLink.icon}} icon breadcrumb-popup-link-icon"></i>
                                  <span class="breadcrumb-popup-link-text">{{nextLink.label}}</span></a>
                              </div>
                          </div>
                          </span>
  </div>
</div>

`
})
export class BreadcrumbPopupComponent {

  @Input()
  breadcrumbDropDown: BreadcrumbDropDown;
  filteredItems: BreadcrumbDropDownItem[];

  @Input()
  isLast: boolean;

  _showPopup = false;
  get showPopup() {
    return this._showPopup;
  }

  set showPopup(isShow: boolean) {
    this._showPopup = isShow;
    if (!isShow) {
      this.removeListeners();
    }
    else {
      this.addListeners();
    }
  }

  constructor(private elementRef: ElementRef) {
    this.search = this.search.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  ngOnDestroy() {
    this.removeListeners();
  }

  private addListeners() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("click", this.onClick);
  }

  private removeListeners() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("click", this.onClick);
  }

  get isShowNextArrow(): boolean {
    return this.isShowBreadcrumbDropDown || !this.isLast;
  }

  get isShowBreadcrumbDropDown(): boolean {

    return this.breadcrumbDropDown &&
      (this.breadcrumbDropDown.getItems != undefined ||
      this.breadcrumbDropDown.items && this.breadcrumbDropDown.items.length > 0);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.which == 27) {
      this.showPopup = false;
    }
  }

  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showPopup = false;
    }
  }

  search(query: string, maxResult: number): Observable<any[]> {
    let search = query.toUpperCase();
    let result = this.items.filter(item => item.label.toLocaleUpperCase().indexOf(search) > -1);
    return Observable.of(result);
  }

  setInitialFilter(event: MouseEvent) {
    event.stopPropagation();

    this.filteredItems = this.items;
    this.showPopup = !this.showPopup;
  }

  get items() {
    if (this.breadcrumbDropDown.getItems) {
      return this.breadcrumbDropDown.getItems();
    }
    else {
      return this.breadcrumbDropDown.items;
    }
  }

  onFilter(filteredBreadcrumbDropDownData) {
    this.filteredItems = filteredBreadcrumbDropDownData;
  }

}
