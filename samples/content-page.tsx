import { build } from '@connectv/sdh';
import { theme } from '@connectv/jss-theme';
import { marked, quotedComponents } from '@connectv/marked';

import { Page } from '../src/components/page';
import { Button, Buttons, CopyButton } from '../src/components/button';
import { Code } from '../src/components/code';
import { Heading } from '../src/components/heading';
import { ContentNav } from '../src/components/contentnav';
import { Tab, Tabs } from '../src/components/tabs';
import { DarkLight, InDark, InLight } from '../src/components/darklight';
import { GithubButton } from '../src/components/github';
import { Watermark } from '../src/components/watermark';
import { CodedocTheme } from '../src/theme';
import { guessTitle } from '../src/util/guess-title';

import { Theme } from './theme';
import { Footer } from '../src/components/footer';
import { Header } from '../src/components/header';


export const buildContentPage = () => build(
  (markdown: string, renderer) => {
    const content = marked(markdown, {
      Code,
      Heading,
      BlockQuote: quotedComponents({
        Button, CopyButton, Buttons, Tab, Tabs, DarkLight, InDark, InLight, GithubButton, Watermark,
      })
    })(renderer);

    return <Page
      title={guessTitle(content, 'Codedoc Sample')}

      header={<Header>
          <GithubButton action='Star' repo='codedoc' user='CONNECT-platform' count={true} standardIcon={true}/>
          <br/><br/>
          <Watermark/>
        </Header>}

      footer={<Footer>
          <a href="https://connective.dev">Website</a>
          <hr/>
          <a href="https://google.com">Community</a>
        </Footer>}
      >
      {content}
      <ContentNav content={content}/>
    </Page>
  }
, () => theme<CodedocTheme>(Theme));
