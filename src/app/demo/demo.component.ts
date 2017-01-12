import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Breadcrumb} from "../breadcrumb/breadcrumb-model";

@Component({
  selector: 'app-demo',
  template: `
    <p>
      in this demo
      I have many products!
      this is product
    </p>
    <span style="background-color: yellow">{{currentProduct}}</span>
    `,

})
export class DemoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  currentProduct:string;

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: {breadcrumb: Breadcrumb}) => {
      this.currentProduct = data.breadcrumb.label;
    });
  }

}
