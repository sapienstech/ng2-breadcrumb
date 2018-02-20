import {Component, Input} from "@angular/core";
import {TestBed, async} from "@angular/core/testing";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {BreadcrumbComponent} from "./breadcrumb.component";
import {
  RouterLinkStubDirective,
  RouterOutletStubComponent,
  ActivatedRouteStub,
  RouterStub
} from "./router-stub";
import {By} from "@angular/platform-browser";
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbRoute, BreadcrumbDropDown} from "./breadcrumb-model";


describe("breadcrumbComponent", () => {
  let router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: BreadcrumbService, useValue: {}},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ],
      declarations: [
        RoutingComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent,
        BreadcrumbComponent,
        DcnBreadcrumbPopupStub
      ]
    });
  }));

  describe(`when hasRoutes`, () => {
    let component;

    beforeEach(() => {
      component = new BreadcrumbComponent(null, null, null);
      spyOnProperty(component, 'hasRoutes', 'get');
    });
    it(`should be true when breadcrumbRoutes have a route`, () => {
      component.breadcrumbRoutes = [{hide: false}];
      expect(component.hasRoutes).toBe(true);
    });
    it(`should be false when has NO shown routes`, () => {
      component.breadcrumbRoutes = [];
      expect(component.hasRoutes).toBe(false);
    });
    it(`should be false when has only a route with 'hide = true'`, () => {
      component.breadcrumbRoutes = [{hide: true}];
      expect(component.hasRoutes).toBe(false);
    });
  });

  describe('when navigation has ended', () => {
    let fixture;
    let links;
    let linkParam;
    let inputBreadcrumbs: BreadcrumbRoute[];
    let visibleBreadcrumbs: BreadcrumbRoute[];
    beforeEach(async(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(RoutingComponent);
        router = TestBed.get(Router);

        let breadcrumbService = TestBed.get(BreadcrumbService);
        linkParam = {id: 8};
        inputBreadcrumbs = [
          buildBreadcrumbs("url1", undefined),
          buildBreadcrumbs("url1", true),//invisible
          buildBreadcrumbs("url3", false),
          buildBreadcrumbs("url4", undefined, linkParam),
        ];
        visibleBreadcrumbs = inputBreadcrumbs.filter(bc => !bc.breadcrumb.hide);
        breadcrumbService.getBreadcrumbs = jasmine.createSpy("getBreadcrumbs").and.returnValue(inputBreadcrumbs);
        router.testEvents = new NavigationEnd(1, "url", "urlAfter");
        fixture.autoDetectChanges();
        let linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
        //get the attached link directive instances using the DebugElement injectors
        links = linkDes
          .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
      });

    }));

    it('should have 4 links', () => {
      expect(links.length).toBe(4, 'should have 4 links');
    });
    it('should have home as the first link', async(() => {
      expect(links[0].linkParams[0]).toBe('', 'should link to Home');
    }));
    it('should bind to routerLink', () => {
      let pos = 0;

      links.map(link => {
        if (pos != 0) {// the first one is Home
          expect(link.linkParams[0]).toBe(visibleBreadcrumbs[pos - 1].url, 'should bind to url');
          //currently I removed params from the routelink
          //expect(link.linkParams[1]).toBe(visibleBreadcrumbs[pos - 1].params, 'should bind to link param');
        }
        pos++;
      });
    });
    it('should have icon for Home link', () => {
      let pos = 0;
      let aElement = fixture.debugElement.queryAll(el => el.name === "a")[0];
      expect(aElement .nativeElement.innerHTML.indexOf("fa fa-home home-icon")).toBeGreaterThan(-1);
    });

    it('should have text and icon for dynamic links', () => {
      let pos = 0;
      let aElements = fixture.debugElement.queryAll(el => el.name === "a");
      aElements.map(link => {
        if (pos != 0) {// the first one is Home
          expect(link.nativeElement.innerHTML.indexOf(visibleBreadcrumbs[pos - 1].breadcrumb.label)).toBeGreaterThan(-1);
          expect(link.nativeElement.innerHTML.indexOf(visibleBreadcrumbs[pos - 1].breadcrumb.icon)).toBeGreaterThan(-1);
        }
        pos++;
      });

    });
    it('should have breadcrumbDropDown popup and bind to breadcrumbDropDown', () => {
      let breadcrumbPopups = fixture.debugElement.queryAll(By.directive(DcnBreadcrumbPopupStub));
      expect(breadcrumbPopups.length).toBe(4);
      let pos = 0;
      breadcrumbPopups
        .map(cmp => {
          if(pos >0){
            let popup = cmp.componentInstance as DcnBreadcrumbPopupStub;
            expect(popup.breadcrumbDropDown).toBe(visibleBreadcrumbs[pos-1].breadcrumb.dropDown);
          }
          pos++;
        });
    });
  });

  function buildBreadcrumbs(url: string, visible: boolean, params = undefined): BreadcrumbRoute {
    return {
      breadcrumb: {
        label: url + "_label",
        icon: url + "_icon",
        dropDown: {popupTitle: "aaa"},
        hide: visible,
      },
      params: params,
      url: url
    };
  }
});

//region test components
@Component({
  template: `
    <dcn-breadcrumb></dcn-breadcrumb>
    <router-outlet></router-outlet>
  `
})
class RoutingComponent {
}

@Component({
  selector: 'dcn-breadcrumb-popup',
  template: ''
})
class DcnBreadcrumbPopupStub {

  @Input()
  breadcrumbDropDown: BreadcrumbDropDown;
  @Input()
  isLast: boolean;
}

//endregion
