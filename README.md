# Navigator
**breadcrumb component**
 ```
   Display's the trail of routs according to angular 2 routs.
   Let the user change the title of a breadcrumb dynamically.
   Let the user navigate back to a previous route.
   Let the user navigate forward by selecting options in a dropdown from the route.
 ```

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

# Dependencies
 Angular 2

#Install
install via npm
```
  npm install ng2-navigator --save
```
#Usage
Import the breadcrumb module into your module.
```
import {BreadcrumbModule} from "ng2-navigator/breadcrumb.module";

@NgModule({
    imports: [BreadcrumbModule],
})
export class AppModule {
    ...
}
```
Place the breadcrumb selector in your component's html somewhere above your router-outlet:
```
<dcn-breadcrumb></dcn-breadcrumb>
.
.
.
<router-outlet></router-outlet>
```
in system.config.js add map
```$xslt
  map: {
    'ng2-navigator': 'npm:ng2-navigator'
```
in system.config.js add package
```$xslt
  packages: {
    'ng2-navigator': { defaultExtension: 'js' }
```

**That is it. you are ready to run your application**
but it does not look nice.
you can change the theme colors.
you can define the theme manually , but you can use a less function to help you.
in the example below you can select winter/spring or summer themes
```$xslt
@import "../node_modules/ng2-navigator/breadcrumb.theme.less";
@import "../node_modules/ng2-navigator/breadcrumb.theme.less";

dcn-breadcrumb.winter {
  .breadcrumb-colors(red, yellow, blue, green);
}

dcn-breadcrumb.spring {
  .breadcrumb-colors(lightgreen, white, #78e2eb, red)
}

dcn-breadcrumb.summer {
  .breadcrumb-colors(#899ee7, #e0e78a, #3bc3ff, red);
}
```
you can change the them to "winter" class like this.
```$xslt
<dcn-breadcrumb class="winter"></dcn-breadcrumb>
```
you should use ```encapsulation: ViewEncapsulation.None```  in order to influence the style, or instead you can import the style from index.html.


#Controlling the text on a breadcrumb
in our routing definitions we can add some more metadata to give the route a friendly name.

in the example below we change path 'dashboard' into 'My Dashboard'. 

```$xslt
const routes: Routes = [
  {
    data:{breadcrumb:{label:'My Dashboard'}},
    path: 'dashboard',
 }
```

there are links that looks like this ```details/:id```
in these cases you want to show the details value instead of details id.
to do that you can listen to routing data changes, and update the label from the component code.
```$xslt
 let heroNameObservable = new BehaviorSubject<string>("hero name");
 this.route.data.subscribe(routeData=>{
       const breadcrumb: Breadcrumb = {
         label: heroNameObservable
       };
       routeData[BREADCRUMB_DATA_KEY] = breadcrumb
     });
```
#Setting forward routing
You can let let the router have a function that shows the forward links
```$xslt
this.route.data.subscribe(data=>{
      const breadcrumb: Breadcrumb = {
        label: "My Heroes",
        dropDown: {getItems: this.buildBreadcrumbDropDownData.bind(this)}
      };
      data[BREADCRUMB_DATA_KEY] = breadcrumb
    });
    
  buildBreadcrumbDropDownData():BreadcrumbDropDownItem[]{
    let breadcrumbDropDownDatas = [];
    let routeURL: string = this.getBaseUrlRecursive(this.route);
    this.heroes.forEach(hero=>{
      let breadcrumbDropDownData: BreadcrumbDropDownItem = {
        label: hero.name,
        url: `detail/${hero.id}`,
      };
      breadcrumbDropDownDatas.push(breadcrumbDropDownData);
    });
    return breadcrumbDropDownDatas;
  }

```
the whole breadcrumb model looks like this.
```$xslt

export interface Breadcrumb {
  label: string|Observable<string>;
  icon?: string;
  hide?: boolean
  dropDown?: BreadcrumbDropDown
}

export interface BreadcrumbDropDown {
  popupTitle?: string;
  items?: BreadcrumbDropDownItem[];
  getItems?: () => BreadcrumbDropDownItem[];
}
export interface BreadcrumbDropDownItem {
  label: string;
  url: string;
  icon?: string;
  params?: Params;
}
```


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run `npm run make-comp` to create NPM package. the build artifacts will be stored in dist/out-es5/src/app/breadcrumb directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
