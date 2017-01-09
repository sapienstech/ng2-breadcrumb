import {NgModule} from "@angular/core";
import {BreadcrumbComponent} from "./breadcrumb.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbPopupComponent} from "./breadcrumb-popup.component";
import {SearchBoxComponent} from "./searchbox.component";
@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [BreadcrumbComponent, BreadcrumbPopupComponent,SearchBoxComponent],
    exports: [BreadcrumbComponent],
    providers: [BreadcrumbService]

})
export class BreadcrumbModule {
}
