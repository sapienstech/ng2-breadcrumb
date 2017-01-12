import {Component, DebugElement, Input} from "@angular/core";
import {TestBed, async, ComponentFixture, fakeAsync, tick} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {BreadcrumbPopupComponent} from "./breadcrumb-popup.component";
import {SearchBoxComponent} from "./searchbox.component";
import {BreadcrumbDropDown} from "./BreadcrumbDropDown";
import {RouterLinkStubDirective} from "./router-stub";

describe("Breadcrumb Popup Component", () => {
  describe('the UI part', () => {
    let fixture;
    let linkParam;
    let inputBreadcrumb: BreadcrumbDropDown;
    let testCmp;
    let page: Page;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [],
        declarations: [
          TestComponent,
          SearchBoxComponent,
          RouterLinkStubDirective,
          BreadcrumbPopupComponent
        ]
      });
    }));

    beforeEach(async(() => {
      TestBed.compileComponents().then(() => {
        createComponent();
        linkParam = {id: 8};
        inputBreadcrumb = buildBreadcrumbs("url1", undefined);
      });

    }));

    describe('when there is NO breadcrumbDropDown valid data', () => {
      it('should not fail if there is no breadcrumbDropDown', () => {
        testCmp.testBreadCrumb = undefined;
        fixture.detectChanges();
        expect(page.links.length).toBe(0);
      });
      it('should not fail if there is no breadcrumbDropDown', () => {
        testCmp.testBreadCrumb = "";
        fixture.detectChanges();
        expect(page.links.length).toBe(0);
      });

      it('should not be visible if there are no items', () => {
        testCmp.testBreadCrumb = inputBreadcrumb;
        fixture.detectChanges();
        fixture.whenStable(fixture).then(() => {
          expect(page.links.length).toBe(0);
          expect(page.dropDownButton).toBe(null);
          expect(page.breadcrumbPopupComponent.isShowBreadcrumbDropDown).toBe(undefined);
        });
      });
    });
    describe('when there is a valid breadcrumbDropDown data', () => {
      beforeEach(async() => {
        inputBreadcrumb.items = [
          {
            label: "first label",

            url: "first url",
            icon: "first icon",
            params: []
          },
          {
            label: "second label",
            url: "second url",
            icon: "second icon",
            params: [{id: 2}]
          }
        ];
        testCmp.testBreadCrumb = inputBreadcrumb;
        fixture.detectChanges();
      });
      it('should have a popup', () => {
        expect(page.popup).toBeDefined();
      });

      describe('when the user click on the button', () => {
        beforeEach(async(() => {
          click(page.dropDownButton);
          detectChanges(fixture).then(() => {
          });
        }));
        it('should have a title', () => {
          expect(page.title.indexOf(inputBreadcrumb.popupTitle)).toBeGreaterThan(-1);
        });
        it('should show the dropdown items with link items', async(() => {
          expect(page.links.length).toBe(inputBreadcrumb.items.length);
        }));
        it('should bind to routerLink', () => {
          let pos = 0;
          let data = inputBreadcrumb.items;
          page.links.map(link => {
            expect(link.linkParams[0]).toBe(data[pos].url, 'should bind to url');
            expect(link.linkParams[1]).toBe(data[pos].params, 'should bind to link param');
            pos++;
          });
        });

        it('should have text and icon for dynamic links', () => {
          let pos = 0;
          let data = inputBreadcrumb.items;
          page.anchorElements.map(anchor => {
            expect(anchor.nativeElement.innerHTML.indexOf(data[pos].label)).toBeGreaterThan(-1);
            expect(anchor.nativeElement.innerHTML.indexOf(data[pos].icon)).toBeGreaterThan(-1);
            pos++;
          });
        });

        describe('when using search box to filter elements', () => {
          it('should have a search box to enable filtering', () => {
            expect(page.searchBox).toBeDefined();
          });
          it('should be bounded to min length', () => {
            expect(page.searchBox.componentInstance.minLength).toBe(0);
          });
          it('should listen to events from search box', () => {
            let onFilterSpy = spyOn(page.breadcrumbPopupComponent, "onFilter").and.callThrough();
            let event = inputBreadcrumb.items.filter(f => f.label.indexOf("first") > -1);
            page.searchBox.triggerEventHandler("results", event);
            detectChanges(fixture).then(() => {
              expect(page.links.length).toBe(1);
              expect(page.links[0].linkParams[0]).toBe(event[0].url);
              expect(onFilterSpy).toHaveBeenCalled();
            });
          });
          it('should supply search data to the search box', fakeAsync(() => {
            let searchSpy = spyOn(page.breadcrumbPopupComponent, "search").and.callThrough();
            let onFilterSpy = spyOn(page.breadcrumbPopupComponent, "onFilter").and.callThrough();
            let input = page.searchBoxInput;
            input.value = "second";
            input.dispatchEvent(new Event('keyup'));
            fixture.detectChanges();

            simulateKeyUpevent(input, "s");
            tick(500);
            detectChanges(fixture).then(() => {
              expect(searchSpy).toHaveBeenCalledWith("second", Number.MAX_SAFE_INTEGER);
              expect(onFilterSpy).toHaveBeenCalledWith([inputBreadcrumb.items [1]]);
            });
          }));
        })
      });
    });

    function createComponent() {
      fixture = TestBed.createComponent(TestComponent);
      testCmp = fixture.debugElement.componentInstance;
      page = new Page(fixture, testCmp);
    }

    function simulateKeyUpevent(element, keyCode) {
      let eventObj: any = document.createEvent("Events");

      if (eventObj.initEvent) {
        eventObj.initEvent("keyup", true, true);
      }
      eventObj.keyCode = keyCode;
      eventObj.which = keyCode;
      element.dispatchEvent ? element.dispatchEvent(eventObj) : element.fireEvent("keydown", eventObj);
    }

  });
  describe('tests not covered from UI', () => {
    let breadcrumbPopupComponent: BreadcrumbPopupComponent;
    let breadcrumbDropDownData: BreadcrumbDropDownItem[];
    const LABEL = "form function";
    beforeEach(() => {
      let inputBreadcrumb = buildBreadcrumbs("dont car", true);
      inputBreadcrumb.getItems = () => {
        return [
          {
            label: LABEL,
            url: "function url",
            icon: "function icon",
            params: []
          }
        ]
      };
      inputBreadcrumb.items = [
        {
          label: "first label",
          url: "first url",
          icon: "first icon",
          params: []
        },
        {
          label: "second label",
          url: "second url",
          icon: "second icon",
          params: [{id: 2}]
        }
      ];
      let breadcrumbPopupComponent = new BreadcrumbPopupComponent();
      breadcrumbPopupComponent.breadcrumbDropDown = inputBreadcrumb;
      breadcrumbDropDownData = breadcrumbPopupComponent.items;
    });
    it('should call the supplied function instead of using the list items', () => {
      expect(breadcrumbDropDownData.length).toBe(1);
      expect(breadcrumbDropDownData[0].label).toBe(LABEL);
    });
  });

  function buildBreadcrumbs(url: string, visible: boolean, params = undefined): BreadcrumbDropDown {
    return {
      popupTitle: "I am a drop down title"
    };
  }
});


class Page {
  fixture: ComponentFixture<TestComponent>;
  testComponent: TestComponent;

  constructor(fixture: ComponentFixture<TestComponent>, testCmp: TestComponent) {
    this.fixture = fixture;
    this.testComponent = testCmp;
  }

  get breadcrumbPopupComponent(): BreadcrumbPopupComponent {
    return this.fixture.debugElement.query(By.directive(BreadcrumbPopupComponent)).componentInstance;
  }

  get dropDownButton(): DebugElement {
    return this.fixture.debugElement.query(By.css('button'));
  }

  get links(): RouterLinkStubDirective[] {
    let linkDes = this.fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    //get the attached link directive instances using the DebugElement injectors
    return linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  }

  get popup(): WjPopup {
    const debugElement = this.fixture.debugElement.query(By.directive(WjPopup));
    return debugElement ? debugElement.componentInstance : undefined;
  }

  get searchBox(): DebugElement {
    return this.fixture.debugElement.query(By.directive(SearchBoxComponent));
  }

  get anchorElements() {
    return this.fixture.debugElement.queryAll(By.css("a"));
  }

  get title() {
    return this.fixture.debugElement.query(By.css("h4")).nativeElement.innerHTML;
  }

  get searchBoxInput(): HTMLInputElement {
    return this.searchBox.query(By.css("input")).nativeElement;
  }
}

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left: {button: 0},
  right: {button: 2}
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
//region test components
@Component({
  template: `
      <dcn-breadcrumb-popup [breadcrumbDropDown]="testBreadCrumb"></dcn-breadcrumb-popup>
  `
})
class TestComponent {
  @Input()
  breadcrumbDropDown: BreadcrumbDropDown;
}

//endregion