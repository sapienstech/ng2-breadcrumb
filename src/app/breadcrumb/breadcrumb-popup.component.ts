import {Component, Input} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {BreadcrumbDropDown, BreadcrumbDropDownItem} from "./breadcrumb-model";

@Component({
  // moduleId: module.id,
  selector: 'dcn-breadcrumb-popup',
  styleUrls: ["./breadcrumb.component.css"],
  template: `
            <span *ngIf="isShowBreadcrumbDropDown" >                    
                    <button #btn3  class="ui-button" (click)="setInitialFilter(breadcrumb)">
                        &#10148;
                    </button>
                    <div class="popover" *ngIf="showPopup">
                      <span class="breadcrumbPopup">
                        <h4 *ngIf="breadcrumbDropDown.popupTitle">{{breadcrumbDropDown.popupTitle}}</h4>
                        <dcn-search-box 
                            [searchData]="search" 
                            [minLength]="0" 
                            (results)="onFilter($event)" 
                            >              
                        </dcn-search-box>

                        <div style="max-height: 150px;overflow: auto">
                            <div *ngFor="let nextLink of filteredItems" >
                    
                                <a [routerLink]="[nextLink.url, nextLink.params?nextLink.params:{}]" >
                                <i  *ngIf="nextLink.icon" class="{{nextLink.icon}} icon" ></i>
                                {{nextLink.label}}</a>
                            </div>
                        </div>
                        </span>
                     </div>
            </span>
      `
})
export class BreadcrumbPopupComponent {

  @Input()
  breadcrumbDropDown: BreadcrumbDropDown;
  filteredItems: BreadcrumbDropDownItem[];

  showPopup = false;

  constructor() {
    this.search = this.search.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  ngOnInit() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("click", this.onClick);
  }

  ngOnDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("click", this.onClick);
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

  onClick() {
    console.log("DDDDDDDD");
    // if (this.showPopup) {
    //   this.showPopup = false;
    // }
  }

  search(query: string, maxResult: number): Observable<any[]> {
    let search = query.toUpperCase();
    let result = this.items.filter(item => item.label.toLocaleUpperCase().indexOf(search) > -1);
    return Observable.of(result);
  }

  setInitialFilter() {
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
