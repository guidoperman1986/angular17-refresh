import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform a date string to a time ago format', () => {
    const pipe = new TimeAgoPipe();
    const date = new Date(Date.now() - 1000 * 60 * 5); // 5 minutes ago
    expect(pipe.transform(date)).toBe('5 minutes ago');
  });

  it('should handle just now value', () => {
    const pipe = new TimeAgoPipe();
    const date = new Date(Date.now());
    expect(pipe.transform(date)).toBe('just now');
  });



});
