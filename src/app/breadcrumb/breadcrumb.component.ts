import {Component, OnInit, TemplateRef, ContentChild, Input, ViewEncapsulation} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import "rxjs/add/operator/filter";
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbRoute} from "./breadcrumb-model";


@Component({
  //moduleId: module.id,
  selector: "dcn-breadcrumb",
  styleUrls: ["./breadcrumb.component.css"],
  //encapsulation: ViewEncapsulation.None,
  template: `
        <div ngClass="breadcrumb">
            <div>
                <a routerLink="">
                     <i class="icon-place-holder-icon icon"></i>
                     Home
                </a>
            </div>
            <div *ngFor="let route of breadcrumbRoutes;" >              
                <a [routerLink]="[route.url, route.params]">
                     <i  *ngIf="route.breadcrumb.icon" class="{{route.breadcrumb.icon}} icon" ></i>                     
                     {{route.breadcrumb.label}}
                </a>       
                <dcn-breadcrumb-popup [breadcrumbDropDown]="route.breadcrumb.dropDown"></dcn-breadcrumb-popup>                
            </div>        
        </div>
  `
})
export class BreadcrumbComponent implements OnInit {

  _theme: string;
  @Input()
  set theme(theme: string) {
    this._theme = theme;
  }

  get theme() {
    if (!this._theme) {
      return "decisionTheme";
    }
    return this._theme;
  }

  public breadcrumbRoutes: BreadcrumbRoute[];

  constructor(private breadcrumbService: BreadcrumbService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.breadcrumbRoutes = [];
    this.theme = "decision";
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.breadcrumbRoutes = this.breadcrumbService.getBreadcrumbs(this.activatedRoute.root)
        .filter(breadcrumb => !breadcrumb.breadcrumb.hide);
    });
  }
}
