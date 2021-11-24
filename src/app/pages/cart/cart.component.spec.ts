import { CartComponent } from "./cart.component"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HttpClientTestingModule} from "@angular/common/http/testing"
import { BookService } from "src/app/services/book.service"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"
import { Book} from "../../models/book.model";

const listBook: Book[] = [
    {name: '', author: '', isbn: '', price: 15, amount: 2},
    {name: '', author: '', isbn: '', price: 20, amount: 1},
    {name: '', author: '', isbn: '', price: 8, amount: 7}
]

describe('CartComponent', () => {
    let component: CartComponent
    let fixture: ComponentFixture<CartComponent>; // Para poder acceder al service
    let service; BookService;

    // Configuracion del test
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ // Simula las peticiones http, no son reales
                HttpClientTestingModule
            ],
            declarations: [ // Componentes
                CartComponent
            ],
            providers: [ // Servicios
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    // Instancia del test
    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // detectamos cambios en el ngOnInit
        service = fixture.debugElement.injector.get(BookService);
        spyOn(service, 'getBooksFromCart').and.callFake(() => null)
    })

    // Tests
    it('should create component CartComponent', () => {
        expect(component).toBeTruthy(); // Esperamos que nuestro component se ha instanciado/creado correctamente
    });

    it('getTotalPrice returns an amount', () => {
        const totalPrice: number = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();
    });

    it('onInputNumberChange increments correctly', () => {
        const action = 'plus';
        const book: Book =  {name: '', author: '', isbn: '', price: 15, amount: 2}

        // Debemos acceder a un servicio desde un componente
        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null); // simulamos una llamada
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(2);
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(3);
        // expect(book.amount === 3).toBeTrue();

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('onInputNumberChange decrements correctly', () => {
        const action = 'minus';
        const book: Book =  {name: '', author: '', isbn: '', price: 15, amount: 3}

        // Debemos acceder a un servicio desde un componente
        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null); // simulamos una llamada
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(3);
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    // se testea el metodo publico y verificamos que dentro de el se llama a la funcion privada
    it('onClearBooks works correctly', () => {
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
        // En los espias de llamadas a servicios, metemos una llamada falsa
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
        component.listCartBook = listBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    // metodo privado
    it('_clearListCartBook', () => {
        const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
        component.listCartBook = listBook;
        component['_clearListCartBook'](); // llamada al metodo privado
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
    });
});