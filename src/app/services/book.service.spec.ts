import { BookService } from "./book.service";
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment";
import swal from 'sweetalert2';

const listBook: Book[] = [
    {name: '', author: '', isbn: '', price: 15, amount: 2},
    {name: '', author: '', isbn: '', price: 20, amount: 1},
    {name: '', author: '', isbn: '', price: 8, amount: 7}
]

const book: Book =  {name: '', author: '', isbn: '', price: 15, amount: 2};

describe('BookService', () => {
    let service: BookService;
    let httpMock: HttpTestingController;
    let storage = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
        
        storage = {};
        spyOn(localStorage, 'getItem').and.callFake((key: string) => {
            return storage[key] ? storage[key] : null; // WTF
        });

        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
            return storage[key] = value;
        });
    });

    afterEach(() => {
        httpMock.verify(); // Para que no haya peticiones pendientes entre tests
    });

    it('should create service BookService', () => {
        expect(service).toBeTruthy();
    });

    it('getBooks return a list of books and the method defined is GET', () => {
        service.getBooks().subscribe((res: Book[]) => {
            expect(res).toEqual(listBook);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET');
        req.flush(listBook); // Simulamos que la peticion se ha hecho y devuelve un observable de listBook
    });


    it('getBooksFromCart return empty array when localStorage is empty', () => {
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });

    it('addBookToCart add a books successfully when the list doesnt exist in the localStorage', () => {
        const toast: any = {
            fire: () => null
        };
        const spy1 = spyOn(swal, 'mixin').and.callFake(() => { return toast });

        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
        service.addBookToCart(book); // añadimos un libro
        listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);
        // añadimos otro libro mas
        service.addBookToCart(book);
        expect(spy1).toHaveBeenCalled();
    });

    it('removeBooksFromCart removes the list from the localStorage', () => {
        service.addBookToCart(book);
        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);

        service.removeBooksFromCart();
        listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });
});