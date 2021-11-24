import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { RouterTestingModule} from '@angular/router/testing';
import { Router } from "@angular/router";

class ComponentTestRoute {}

describe('Nav component', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {path: 'home', component: ComponentTestRoute},
                    {path: 'cart', component: ComponentTestRoute}
                ])
            ],
            declarations: [
                NavComponent
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    // Instancia del test
    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); 
    })

    // Tests
    it('should create component NavComponent', () => {
        expect(component).toBeTruthy(); // Esperamos que nuestro component se ha instanciado/creado correctamente
    });

    it('should navigate correctly', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigate');

        component.navTo('home');
        expect(spy).toHaveBeenCalledWith(['/home']);
        //expect(spy).toHaveBeenCalled();

        component.navTo('cart');
        expect(spy).toHaveBeenCalledWith(['/cart']);

    });

})