import { render, screen, waitFor } from '@testing-library/react';
import DynamicInset, {
  extractScripts,
  hashToObject,
  htmlFromData,
} from './index';

const insetMock = {
  serverside: {
    data: {
      data: {
        foo: 'Foo',
      },
    },
    template: {
      template: '<p>{{foo}}</p>',
    },
  },
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(insetMock),
  })
);

describe('DynamicInset/extractScripts', () => {
  test('should return array of extracted scripts if any', () => {
    const html = '<p>Foo</p><script>console.log("foo")</script>';
    const [insetHtml, scripts] = extractScripts(html);
    expect(insetHtml).toBe('<p>Foo</p>');
    expect(scripts.length).toEqual(1);
  });
});

describe('DynamicInset/hashToObject', () => {
  test('should not break if malformed url is passed', () => {
    const result = hashToObject(null);
    expect(result).toStrictEqual({});
  });

  test('should return empty object if url does not contain hash or hash has no key value pairs', () => {
    const result = hashToObject('https://www.foo.com');
    expect(result).toStrictEqual({});
  });

  test('should return object with key value pairs', () => {
    const result = hashToObject('https://www.foo.com#foo=bar&baz');
    expect(result).toStrictEqual({ foo: 'bar', baz: null });
  });
});

describe('DynamicInset/htmlFromData', () => {
  test('should return undefined if no template data', () => {
    const result = htmlFromData(null, null);
    expect(result).toBe(undefined);
  });

  test('should render html', () => {
    const result = htmlFromData(insetMock);
    expect(result).toBe('<p>Foo</p>');
  });

  test('should render html with hash data', () => {
    const result = htmlFromData(insetMock, 'https://www.foo.com#foo=Bar');
    expect(result).toBe('<p>Bar</p>');
  });
});

describe('DynamicInset', () => {
  test('should render nothing if no data or url are passed', () => {
    const { container } = render(<DynamicInset />);
    expect(container.firstChild).toBe(null);
  });

  test('should render html if data is passed', () => {
    render(<DynamicInset data={insetMock} />);
    expect(screen.getByText('Foo', { selector: 'p' })).toBeInTheDocument();
  });

  test('should add extracted scripts from rendered html', () => {
    const insetMockWithScripts = { ...insetMock };
    insetMockWithScripts.serverside.template.template = `${insetMockWithScripts.serverside.template.template}<script data-testid="script">console.log("foo")</script>`;
    render(<DynamicInset data={insetMockWithScripts} />);
    expect(screen.getByText('Foo', { selector: 'p' })).toBeInTheDocument();
    expect(
      screen.getByTestId('script', { selector: 'script' })
    ).toBeInTheDocument();
  });

  test('should render html from fetched data when no data is passed but url is', async () => {
    render(<DynamicInset url="foo" />);
    await waitFor(() => {
      expect(screen.getByText('Foo', { selector: 'p' })).toBeInTheDocument();
    });
  });
});
