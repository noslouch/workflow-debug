import { toVars } from './index';

describe('toVars helper function', () => {
  test('should return empty object on missing object argument', () => {
    const cssVars = toVars();
    expect(typeof cssVars).toEqual('object');
    expect(Object.keys(cssVars).length).toEqual(0);
  });

  test('should correctly parse 1 level deep', () => {
    const cssVars = toVars({ foo: 'bar' });
    expect(cssVars).toStrictEqual({ '--foo': 'bar' });
  });

  test('should correctly parse 2 levels deep', () => {
    const cssVars = toVars({ foo: { bar: 'baz' } });
    expect(cssVars).toStrictEqual({ '--foo-bar': 'baz' });
  });

  test('should correctly parse 2+ levels deep', () => {
    const cssVars = toVars({ foo: { bar: { baz: 'qux' } } });
    expect(cssVars).toStrictEqual({ '--foo-bar-baz': 'qux' });
  });
});
