import { ReduceTextPipe } from "./reduce-text.pipe";

describe('ReduceTextPipe', () => {
    let pipe: ReduceTextPipe;

    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it('should create pipe ReduceTextPipe', () => {
        expect(pipe).toBeTruthy();
    });

    it('use transform correctly', () => {
        const text = 'This is a string to check the pipe';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);
    });
});