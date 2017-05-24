

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Breadcrumb} from "./breadcrumb-model";
import {BREADCRUMB_DATA_KEY} from "./breadcrumb.service";
import {BreadcrumbRouterService} from "./breadcrumb-router.service";

@Component({
  moduleId: "" + module.id,
  selector: 'selector',
  providers:[BreadcrumbRouterService],
  template: `
<router-outlet></router-outlet>
`
})
export class RoutePlaceHolderComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: {resolvedBreadcrumb: Breadcrumb, BREADCRUMB_DATA_KEY: any}) => {
      data[BREADCRUMB_DATA_KEY] = data.resolvedBreadcrumb;
    });
  }

}
