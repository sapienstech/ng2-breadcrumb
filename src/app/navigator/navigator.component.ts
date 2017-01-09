// import {Component, OnInit, Injectable} from "@angular/core";
// import {Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET} from "@angular/router";
// import "rxjs/add/operator/filter";
// import {BreadcrumbData, BREADCRUMB_DATA_KEY, Breadcrumb} from "../model/breadcrumb.model";
//
//
// @Component({
//   //moduleId: module.id,
//   selector: "dcn-breadcrumb",
//   styleUrls: ["./breadcrumb.component.css"],
//   template: `
//     <div class="ui-breadcrumb">
//         <div class="breadcrumb flat">
//             <div>
//                 <a routerLink="">
//                      <i class="icon-place-holder-icon icon"></i>
//                      Home
//                 </a></div>
//             <div *ngFor="let breadcrumb of breadcrumbs">
//
//                 <a [routerLink]="[breadcrumb.url, breadcrumb.params]">
//                      <i  *ngIf="breadcrumb.breadcrumbData.icon" class="{{breadcrumb.breadcrumbData.icon}} icon" ></i>
//                      {{breadcrumb.breadcrumbData.label}}
//                 </a>
//                 <dcn-breadcrumb-popup [breadcrumb]="breadcrumb"></dcn-breadcrumb-popup>
//             </div>
//         </div>
//     </div>
//   `
// })
// export class NavigatorComponent implements OnInit {
//
//   public breadcrumbs: Breadcrumb[];
//
//   constructor(private activatedRoute: ActivatedRoute,
//               private router: Router) {
//     this.breadcrumbs = [];
//   }
//
//   ngOnInit() {
//     this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
//       this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root)
//         .filter(breadcrumb => !breadcrumb.breadcrumbData.hide);
//     });
//   }
//
//   /**
//    * Returns array of Breadcrumb objects that represent the breadcrumb
//    */
//   public getBreadcrumbs(route: ActivatedRoute): Breadcrumb[] {
//     let breadcrumbs: Breadcrumb[] = [];
//     this.getBreadcrumbsRecursive(route, "", breadcrumbs);
//     return  breadcrumbs;
//   }
//
//   private getBreadcrumbsRecursive(route: ActivatedRoute, url: string, breadcrumbs: Breadcrumb[]): void {
//
//     //get the child routes
//     let children: ActivatedRoute[] = route.children;
//
//     //return if there are no more children
//     if (!children || children.length === 0) {
//       return;
//     }
//
//     //iterate over each children
//     let child = children.find(child => child.outlet == PRIMARY_OUTLET);
//     if (!child || child.routeConfig.path.length==0) {
//       return;
//     }
//
//     //verify the custom property "breadcrumb" is specified on the route
//     if (!child.snapshot.data.hasOwnProperty(BREADCRUMB_DATA_KEY)) {
//       let name = this.buildPlainBreadcrumbData(child);
//       child.snapshot.data[BREADCRUMB_DATA_KEY] = name;
//     }
//
//     //get the route's URL segment
//     let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
//
//     //append route URL to URL
//     url += `/${routeURL}`;
//
//     //add breadcrumb
//     let breadcrumb: Breadcrumb = {
//       breadcrumbData: child.snapshot.data[BREADCRUMB_DATA_KEY],
//       params: child.snapshot.params,
//       url: url
//     };
//     breadcrumbs.push(breadcrumb);
//
//     return this.getBreadcrumbsRecursive(child, url, breadcrumbs);
//
//
//   }
//
//   private buildPlainBreadcrumbData(child: ActivatedRoute): BreadcrumbData {
//     return {
//       label: child.routeConfig.path,
//       popupTitle: "",
//       icon: "icon-explanation_mark",
//       breadcrumbDropDownData: []
//     };
//   }
//
// }
//
//
// @Injectable()
// export class BreadcrumbService {
//   private breadcrumbs: Breadcrumb[];
//
//   constructor() {
//
//   }
//
// }
