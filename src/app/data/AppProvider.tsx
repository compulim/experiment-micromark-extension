import { memo, useMemo, useState, type ReactNode } from 'react';

import AppContext, { type AppContextType } from './private/AppContext';

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

const AppProvider = memo(({ children }: AppProviderProps) => {
  const [value, setValue] = useState<string>(SAMPLE_VALUE);

  const context = useMemo<AppContextType>(() => Object.freeze({ setValue, value }), [setValue, value]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
});

export default memo(AppProvider);
