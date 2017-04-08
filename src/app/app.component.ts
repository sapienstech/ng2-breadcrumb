import {Component, ViewEncapsulation} from '@angular/core';
import {BreadcrumbDropDown} from "./breadcrumb/breadcrumb-model";

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  themes = ["winter", "summer", "spring", "decisionTheme"];
  selectedTheme: "NO_THEME";

  homeDropDown:BreadcrumbDropDown={items:[{label:"SSSS",url:"dddd"}]};
}
