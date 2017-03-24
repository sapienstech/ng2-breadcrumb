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

<!--<div>-->
 <!--<svg height="28" width="409" preserveAspectRatio="slice" viewBox="100 50 28000 1000" style="background-color: red">-->
               <!--<path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5-->
		<!--c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z-->
		<!--"/>-->
            <!--</svg>-->
<!--</div>-->
<div class="breadcrumb">
    <div class="breadcrumb-holder">
        <a routerLink="" class="breadcrumb-link">
            <span><i class="fa fa-home home-icon"></i></span>
        </a>
            <button *ngIf="hasRoutes" class="menu-button has-no-popup">
           

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" 
  id="Capa_1" x="0px" y="0px" 
  viewBox="0 0 477.175 477.175" 
  style="enable-background:new 0 0 477.175 477.175;" 
  xml:space="preserve" width="20px" height="30px">
<g>
	<path class="arrow" d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   " fill="#FFFFFF"/>
</g>
</svg>
            
            
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
