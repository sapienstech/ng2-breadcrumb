import {Component, Input, ElementRef} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {BreadcrumbDropDown, BreadcrumbDropDownItem} from "./breadcrumb-model";
import {isPromise} from "rxjs/util/isPromise";
import {Subscription} from "rxjs";

const ESCAPE = 27;

@Component({
  moduleId: "" + module.id,
  selector: 'dcn-breadcrumb-popup',
  styleUrls: ["breadcrumb.component.css"],
  template: `
<div class="popover" >
  <button *ngIf="isShowNextArrow"  #btn3 [ngClass]="{'menu-button':true, 'has-no-popup':!isShowBreadcrumbDropDown,'has-popup':isShowBreadcrumbDropDown,'is-active':showPopup}" (click)="setInitialFilter($event)">
    <i class="fa fa-angle-right menu-button-icon"></i>
  </button>
  <div *ngIf="showPopup" class="breadcrumbPopup">
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
    this.unSubscribeFromPopupInfo();
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
      isPromise(this.breadcrumbDropDown.items) ||
      this.breadcrumbDropDown.items instanceof Observable ||
      this.breadcrumbDropDown.items && this.breadcrumbDropDown.items.length > 0);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.which == ESCAPE) {
      this.showPopup = false;
    }
  }

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

    if (isPromise(this.items)) {
      this.items.then(vals => {
        this.allItems = vals;
        this.filteredItems = this.allItems;
        this.showPopup = !this.showPopup;
      })
    }
    else if (this.items instanceof Observable) {
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
