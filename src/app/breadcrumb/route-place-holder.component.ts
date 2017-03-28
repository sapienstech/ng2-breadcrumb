

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Breadcrumb} from "./breadcrumb-model";
import {BREADCRUMB_DATA_KEY} from "./breadcrumb.service";

@Component({
  moduleId: module.id,
  selector: 'selector',
  template: `
<router-outlet></router-outlet>
`
})
export class RoutePlaceHolderComponet implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: {resolvedBreadcrumb: Breadcrumb, BREADCRUMB_DATA_KEY: any}) => {
      data[BREADCRUMB_DATA_KEY] = data.resolvedBreadcrumb;
    });
  }

}
