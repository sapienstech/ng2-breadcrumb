import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app works!';
  themes = ["winter", "summer", "spring", "decisionTheme"];
  selectedTheme: "NO_THEME";
}
