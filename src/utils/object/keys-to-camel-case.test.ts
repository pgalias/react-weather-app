import { keysToCamelCase } from './keys-to-camel-case';

describe('keysToCamelCase', () => {
  test.each([
    [{ foo_bar: 'baz' }, { fooBar: 'baz' }],
    [{ FOO_BAR: 'baz' }, { fooBar: 'baz' }],
    [{ 'foo-bar': 'baz' }, { fooBar: 'baz' }],
    [{ Foo: 'bar' }, { foo: 'bar' }],
    [{ FooBar: 'baz' }, { fooBar: 'baz' }],
    [{ foo: 'bar' }, { foo: 'bar' }],
  ])('should map object keys to camel case notation', (received, expected) => {
    expect(keysToCamelCase(received)).toEqual(expected);
  });
});
