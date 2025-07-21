import { HighlightTextPipe } from './highlight-text.pipe';

describe('HighlightTextPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('should highlight the search term in the text', () => {
    const pipe = new HighlightTextPipe();
    const text = 'Hello World';
    const search = 'World';
    const result = pipe.transform(text, search);
    expect(result).toBe('Hello <mark>World</mark>');
  });

  it('should return the original text if search term is empty', () => {
    const pipe = new HighlightTextPipe();
    const text = 'Hello World';
    const search = '';
    const result = pipe.transform(text, search);
    expect(result).toBe(text);
  });
});
