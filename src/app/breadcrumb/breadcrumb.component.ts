import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import "rxjs/add/operator/filter";
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbRoute} from "./breadcrumb-model";


@Component({
    //moduleId: module.id,
    selector: "dcn-breadcrumb",
    styleUrls: ["./breadcrumb.component.css"],
    template: `
    <div class="ui-breadcrumb">
        <div class="breadcrumb flat">
            <div>
                <a routerLink="">
                     <i class="icon-place-holder-icon icon"></i>
                     Home
                </a></div>
            <div *ngFor="let route of breadcrumbRoutes">

                <a [routerLink]="[route.url, route.params]">
                     <i  *ngIf="route.breadcrumb.icon" class="{{route.breadcrumb.icon}} icon" ></i>                     
                     {{route.breadcrumb.label}}
                </a>       
                <dcn-breadcrumb-popup [breadcrumbDropDown]="route.breadcrumb.dropDown"></dcn-breadcrumb-popup>                
            </div>        
        </div>
    </div>
  `
})
export class BreadcrumbComponent implements OnInit {

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
