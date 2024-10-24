import { HtmlRenderer as CommonMarkHTMLRenderer, Parser as CommonMarkParser } from 'commonmark';
import MarkdownIt from 'markdown-it';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import pluginsForHTML from 'prettier/plugins/html';
import { format } from 'prettier/standalone.js';
import { memo, useEffect, useMemo, useState, type ReactNode } from 'react';
import sanitizeHTML from 'sanitize-html';
import AppContext, { type AppContextType, type SupportedMarkdownEngine } from './private/AppContext';

type AppProviderProps = Readonly<{
  children?: ReactNode | undefined;
}>;

const SAMPLE_VALUE = `## Regressions

The followings are to protect against regressions:

- Hello {World}
- Hello {1}

## Supported

The followings are supported Markdown attributes:

- [Link](https://bing.com/){aria-label="This is a label"} should return \`<a aria-label="This is a label">\`
- [Link](https://bing.com/){aria-label=Hello} should return \`<a aria-label="Hello">\`
- [Link](https://bing.com/){aria-label=} should return \`<a aria-label>\`
- [Link](https://bing.com/){aria-label} should return \`<a aria-label>\`
- [Link](https://bing.com/){  aria-label="  This is a label with many whitespaces  "  } should return \`<a aria-label="  This is a label with many whitespaces  ">\`
- [Link](https://bing.com/){aria-label=a"b"c} should return \`<a aria-label="a"b"c">\`

## Not recognized

The followings are not recognized as Markdown attributes and should left untouched:

- [Link](https://bing.com/){aria-label=This is ignored} should left untouched
- [Link](https://bing.com/){aria-label ="This is a label with whitespace before equal sign"} should left untouched
- [Link](https://bing.com/){.ignored} should left untouched
- [Link](https://bing.com/){onload="javascript:void()"} should left untouched

## Other cases

### Not processed by \`markdown-it-attrs\`

- {aria-label="123"} should left untouched
- {aria-label=} should left untouched
- {aria-label} should left untouched

### Processed by \`markdown-it-attrs\`

- Hello, *World*{aria-label="Emphasized"}!
`;

const SAMPLE_VALUE_2 = `## Header

<p>This is some text with a <a href="http://example.com" title="even hackers respect a11y">link in it</a>. Also <strong>some text</strong> <em>with formatting</em>.</p>

<ul>

<li>Unordered</li>

<li>list</li>

<li>items</li>

</ul>

<ol>

<li>Ordered</li>

<li>list</li>

<li>items</li>

</ol>

<ul>

<li>Below are some unsafe things that should get sanitized:

  <li><script>This isn't allowed!</script>

<li><img src="" alt="I am a dummy image trying to hack you" onerror=alert(1) />

<li><svg aria-label="malicious svg here"><g/onload=alert(2)//<p>

<li><p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>
  .
<li><math><mi//xlink:href="data:x,<script>alert(4)</script>

<li>

</ul>`;

const AppProvider = memo(({ children }: AppProviderProps) => {
  const [html, setHTML] = useState<string>('');
  const [value, setValue] = useState<string>(SAMPLE_VALUE);
  const [shouldEnableGFM, setShouldEnableGFM] = useState<boolean>(true);
  const [shouldSanitize, setShouldSanitize] = useState<boolean>(true);
  const [markdownEngine, setMarkdownEngine] = useState<SupportedMarkdownEngine>('micromark');

  useEffect(() => {
    const abortController = new AbortController();

    (async signal => {
      let html: string;

      if (markdownEngine === 'commonmark') {
        const reader = new CommonMarkParser();
        const writer = new CommonMarkHTMLRenderer();
        const parsed = reader.parse(value);

        html = writer.render(parsed);
      } else if (markdownEngine === 'markdown-it') {
        html = new MarkdownIt({ html: true }).render(value);
      } else {
        markdownEngine satisfies 'micromark';

        html = micromark(value, {
          allowDangerousHtml: true,
          ...(shouldEnableGFM ? { extensions: [gfm()], htmlExtensions: [gfmHtml()] } : {})
        });
      }

      if (shouldSanitize) {
        html = sanitizeHTML(html);
      }

      try {
        html = await format(html, { parser: 'html', plugins: [pluginsForHTML] });
      } catch {
        // Failed to parse and prettify HTML probably because it is invalid. Ignore it.
      }

      signal.aborted || setHTML(html);
    })(abortController.signal);

    return () => abortController.abort();
  }, [markdownEngine, setHTML, shouldEnableGFM, shouldSanitize, value]);

  const context = useMemo<AppContextType>(
    () =>
      Object.freeze({
        html,
        markdownEngine,
        setMarkdownEngine,
        setShouldEnableGFM,
        setShouldSanitize,
        setValue,
        shouldEnableGFM,
        shouldSanitize,
        value
      }),
    [
      html,
      markdownEngine,
      setMarkdownEngine,
      setShouldEnableGFM,
      setShouldSanitize,
      setValue,
      shouldEnableGFM,
      shouldSanitize,
      value
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
});

export default memo(AppProvider);
