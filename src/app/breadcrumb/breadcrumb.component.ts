import {Component, OnInit, Input} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
//import "rxjs/add/operator/filter";
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbRoute} from "./breadcrumb-model";
import {Observable} from "rxjs/observable";

@Component({
  moduleId: "" + module.id,
  selector: "dcn-breadcrumb",
  styleUrls: ["breadcrumb.component.css"],
  template: `

<div class="breadcrumb">
    <div class="breadcrumb-holder">
        <a routerLink="" class="breadcrumb-link">
            <span><i class="fa fa-home home-icon"></i></span>
        </a>
            <button *ngIf="hasRoutes" class="menu-button has-no-popup">
             <i class="fa fa-angle-right menu-button-icon"></i>
            </button>
    </div>

    <div *ngFor="let route of breadcrumbRoutes; let i = index; let isLast=last" class="breadcrumb-holder">
        <a [routerLink]="[route.url, route.params]" class="breadcrumb-link">
            <i *ngIf="route.breadcrumb.icon" class="{{route.breadcrumb.icon}} icon link-icon"></i>
            <span *ngIf="!isString(route.breadcrumb.label)">{{route.breadcrumb.label |async}}</span>
            <span *ngIf="isString(route.breadcrumb.label)">{{route.breadcrumb.label}}</span>
        </a>
        <dcn-breadcrumb-popup [isLast]="isLast" [breadcrumbDropDown]="route.breadcrumb.dropDown"></dcn-breadcrumb-popup>
    </div>
</div>

`
})
export class BreadcrumbComponent implements OnInit {


  isString(val: string|Observable<string>) {
    return typeof val == "string";
  }

  get hasRoutes(): boolean {
    return this.breadcrumbRoutes && this.breadcrumbRoutes.length > 0;
  }

  public breadcrumbRoutes: BreadcrumbRoute[];

  constructor(private breadcrumbService: BreadcrumbService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.breadcrumbRoutes = [];
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.breadcrumbRoutes = this.breadcrumbService.getBreadcrumbs(this.activatedRoute.root)
        .filter(breadcrumb => !breadcrumb.breadcrumb.hide);
    });
  }
}
