import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Breadcrumb} from "../breadcrumb/breadcrumb-model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-demo',
  template: `
    <p>
      in this demo
      I have many products!
      this is product
    </p>
    <span style="background-color: yellow">{{currentProduct}} </span>
    `,

})
export class DemoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  currentProduct: string;


  ngOnInit() {
    let xxx = new BehaviorSubject<string>("I am a Product");
    this.activatedRoute.data.subscribe((data: {breadcrumb: Breadcrumb}) => {
      data.breadcrumb = {
        label: xxx,
        dropDown: {
          items: [
            {label: "product1", url: "products/product1"},
            {label: "product2", url: "products/product2"}
          ]
        }
      };
      setTimeout(() => {
        xxx.next("I have Changed");
        xxx.complete();
      },5000);
    });
  }

}
