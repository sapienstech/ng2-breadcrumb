import {NgModule} from "@angular/core";
import {BreadcrumbComponent} from "./breadcrumb.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbPopupComponent} from "./breadcrumb-popup.component";
import {SearchBoxComponent} from "./searchbox.component";
import {RoutePlaceHolderComponent} from "./route-place-holder.component";
import {BreadcrumbRouterService} from "./breadcrumb-router.service";
import {BreadcrumbResolver} from "./breadcrumb.resolver";
import {BreadcrumbDynamicResolver} from "./BreadcrumbDynamicResolver";
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BreadcrumbComponent, BreadcrumbPopupComponent, SearchBoxComponent, RoutePlaceHolderComponent],
  exports: [BreadcrumbComponent, RoutePlaceHolderComponent],
  providers: [BreadcrumbService, BreadcrumbRouterService, BreadcrumbResolver, BreadcrumbDynamicResolver]

})
export class BreadcrumbModule {
}
