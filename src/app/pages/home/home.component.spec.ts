import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book.model";
import { of } from 'rxjs';

// fit para probar solo un test, fdescribe para probar solo 1 componente
// xit anula la prueba, xdecribe anula la prueba del componente

const listBook: Book[] = [
    {name: '', author: '', isbn: '', price: 15, amount: 2},
    {name: '', author: '', isbn: '', price: 20, amount: 1},
    {name: '', author: '', isbn: '', price: 8, amount: 7}
]

@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform {
    transform(): string {
        return '';
    }
}

const BookServiceMock = {
    getBooks: () => of(listBook),
}

describe('Home component', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let service: BookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent,
                ReduceTextPipeMock
            ],
            providers: [
                //BookService
                {
                    provide: BookService,
                    useValue: BookServiceMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    // Instanciamos el componente
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
    });


    it('should create component HomeComponent', () => {
        expect(component).toBeTruthy();
    });

    it('getBooks get books from the subscription', () => {
        // const spy1 = spyOn(service, 'getBooks').and.returnValue(of(listBook)); // of -> Observable
        //debugger;
        component.getBooks();
        //expect(spy1).toHaveBeenCalled();
        expect(component.listBook.length).toBe(3);
    });
});