import { build } from '@connectv/sdh';
import { theme } from '@connectv/jss-theme';
import { marked, quotedComponents } from '@connectv/marked';

import { Page } from '../src/components/page';
import { Button, Buttons, CopyButton } from '../src/components/button';
import { Code } from '../src/components/code';
import { Heading } from '../src/components/heading';
import { CodedocTheme } from '../src/theme';

import { Theme } from './theme';


export const buildContentPage = () => build(
  (content: string, renderer, file) => 
    <Page>
      {marked(content, {
        Code,
        Heading,
        BlockQuote: quotedComponents({
          Button, CopyButton, Buttons,
        })
      })(renderer)}
    </Page>
, () => theme<CodedocTheme>(Theme));
