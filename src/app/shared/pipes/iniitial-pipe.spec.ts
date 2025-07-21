import { InitialPipePipe } from './initial-pipe.pipe';


describe('InitialPipe', () => {
    it('create an instance', () => {
        const pipe = new InitialPipePipe();
        expect(pipe).toBeTruthy();
    });


    it('should return initials of a name', () => {
        const pipe = new InitialPipePipe();
        expect(pipe.transform('John Doe')).toBe('JD');
    });

    it('should return null for null input', () => {
        const pipe = new InitialPipePipe();
        expect(pipe.transform(null)).toBeNull();
    });
});
