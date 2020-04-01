import { build } from '@connectv/sdh';
import { theme } from '@connectv/jss-theme';
import { marked, quotedComponents } from '@connectv/marked';

import { Page } from '../src/components/page';
import { Button, Buttons, CopyButton } from '../src/components/button';
import { Code } from '../src/components/code';
import { Heading } from '../src/components/heading';
import { ContentNav } from '../src/components/contentnav';
import { Tab, Tabs } from '../src/components/tabs';
import { CodedocTheme } from '../src/theme';
import { guessTitle } from '../src/util/guess-title';

import { Theme } from './theme';


export const buildContentPage = () => build(
  (markdown: string, renderer) => {
    const content = marked(markdown, {
      Code,
      Heading,
      BlockQuote: quotedComponents({
        Button, CopyButton, Buttons, Tab, Tabs,
      })
    })(renderer);

    return <Page title={guessTitle(content, 'Codedoc Sample')}>
      {content}
      <ContentNav content={content}/>
    </Page>
  }
, () => theme<CodedocTheme>(Theme));
