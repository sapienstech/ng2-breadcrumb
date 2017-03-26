import {Component, ViewEncapsulation} from '@angular/core';

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
}
