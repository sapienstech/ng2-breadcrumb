import {NgModule} from "@angular/core";
import {BreadcrumbComponent} from "./breadcrumb.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbPopupComponent} from "./breadcrumb-popup.component";
import {SearchBoxComponent} from "./searchbox.component";
import {RoutePlaceHolderComponet} from "./route-place-holder.component";
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BreadcrumbComponent, BreadcrumbPopupComponent, SearchBoxComponent, RoutePlaceHolderComponet],
  exports: [BreadcrumbComponent, RoutePlaceHolderComponet],
  providers: [BreadcrumbService]

})
export class BreadcrumbModule {
}
