import { build } from '@connectv/sdh';
import { theme } from '@connectv/jss-theme';
import { marked, quotedComponents } from '@connectv/marked';

import { Page } from '../src/components/page';
import { Button, Buttons } from '../src/components/button';
import { Code } from '../src/components/code';
import { CodedocTheme } from '../src/theme';

import { Theme } from './theme';


export const buildContentPage = () => build(
  (content: string, renderer, file) => 
    <Page>
      {marked(content, {
        Code,
        BlockQuote: quotedComponents({
          Button,
          Buttons,
        })
      })(renderer)}
    </Page>
, () => theme<CodedocTheme>(Theme));
