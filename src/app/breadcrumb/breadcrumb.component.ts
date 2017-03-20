import {Component, OnInit, TemplateRef, ContentChild, Input, ViewEncapsulation} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import "rxjs/add/operator/filter";
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbRoute} from "./breadcrumb-model";
import {Observable} from "rxjs/observable";


@Component({
  moduleId: ""+module.id,
  selector: "dcn-breadcrumb",
  styleUrls: ["breadcrumb.component.css"],
  templateUrl:'breadcrumb.component.html'
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

  isString(val: string|Observable<string>) {
    return typeof val == "string";
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
