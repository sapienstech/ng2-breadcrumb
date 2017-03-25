import {Component, Input, ElementRef, HostListener} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {BreadcrumbDropDown, BreadcrumbDropDownItem} from "./breadcrumb-model";
import {Subscription} from "rxjs/Subscription";

@Component({
  moduleId: "" + module.id,
  selector: 'dcn-breadcrumb-popup',
  styleUrls: ["breadcrumb.component.css"],
  template: `
<div class="popover" >
  <button *ngIf="isShowNextArrow"  #btn3 [ngClass]="{'menu-button':true, 'has-no-popup':!isShowBreadcrumbDropDown,'has-popup':isShowBreadcrumbDropDown,'is-active':showPopup}" (click)="setInitialFilter($event)">
  <svg class="menu-button-icon"
  id="Capa_1" x="0px" y="0px" 
  viewBox="0 0 477.175 477.175" 
  style="enable-background:new 0 0 477.175 477.175;" 
  xml:space="preserve" width="20px" height="30px">
<g>
	<path  class="arrow" d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   " fill="#FFFFFF"/>
</g>
</svg>

  </button>
  <div *ngIf="showPopup" class="breadcrumbPopup">
  <div class="arrowUp"></div>
      <h4 *ngIf="breadcrumbDropDown.popupTitle">{{breadcrumbDropDown.popupTitle}}</h4>
      <dcn-search-box class="breadcrumb-popup-search"
                      [searchData]="search"
                      [minLength]="0"
                      (results)="onFilter($event)">
      </dcn-search-box>
  
      <div class="breadcrumb-popup-menu">
          <div *ngFor="let nextLink of filteredItems" class="breadcrumb-popup-menu-item">
              <a [routerLink]="[nextLink.url, nextLink.params?nextLink.params:{}]"
                 class="breadcrumb-popup-link">
              <i class="{{nextLink.icon}} icon breadcrumb-popup-link-icon"></i>
              <span class="breadcrumb-popup-link-text">{{nextLink.label}}</span></a>
          </div>
      </div>
  </div>

</div>

`
})
export class BreadcrumbPopupComponent {

  @Input()
  breadcrumbDropDown: BreadcrumbDropDown;
  filteredItems: BreadcrumbDropDownItem[];
  allItems: BreadcrumbDropDownItem[];

  @Input()
  isLast: boolean;

  _showPopup = false;
  private subscription: Subscription;

  get showPopup() {
    return this._showPopup;
  }

  set showPopup(isShow: boolean) {
    this._showPopup = isShow;

  }

  constructor(private elementRef: ElementRef) {

  }

  ngOnDestroy() {
    this.unSubscribeFromPopupInfo();
  }

  get isShowNextArrow(): boolean {
    return this.isShowBreadcrumbDropDown || !this.isLast;
  }

  get isShowBreadcrumbDropDown(): boolean {

    return this.breadcrumbDropDown &&
      (this.breadcrumbDropDown.getItems != undefined ||
      this.breadcrumbDropDown.items instanceof Observable ||
      this.breadcrumbDropDown.items && this.breadcrumbDropDown.items.length > 0);
  }

  @HostListener('keydown.escape', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.showPopup = false;
  }

  @HostListener('document:click',['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showPopup = false;
    }
  }

  search(query: string): Observable<any[]> {
    let search = query.toUpperCase();
    let result = this.allItems.filter(item => item.label.toLocaleUpperCase().indexOf(search) > -1);
    return Observable.of(result);
  }

  setInitialFilter(event: MouseEvent) {
    event.stopPropagation();

    if (this.items instanceof Observable) {
      this.unSubscribeFromPopupInfo();
      this.subscription = this.items.subscribe(vals => {
        this.allItems = vals;
        this.filteredItems = this.allItems;
        this.showPopup = !this.showPopup;
      })
    }
    else {
      this.allItems = this.items;
      this.filteredItems = this.allItems;
      this.showPopup = !this.showPopup;
    }
  }

  private unSubscribeFromPopupInfo() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
