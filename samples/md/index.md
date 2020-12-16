> :DarkLight
> > :InLight
> >
> > ![header](/repo-banner.svg)
>
> > :InDark
> >
> > ![header](/repo-banner-dark.svg)

# For Musti

## The standard Lorem Ipsum passage, used since the 1500s

"Lorem ipsum dolor sit amet[and a footnote](:Footnote) , consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

## Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC

"Sed ut perspiciatis unde[](:Footnote (id=second)) omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

> :Footnote id=second
>
> Also some other _stuff_. \
> Plus more stuff as well.

> :Footnotes

| message | target   |
| :------ | -----:   |
| Hellow  | World    |
| Goodbye | Blue Sky |
| Hey     | Mr. Jack |

```bash | --term eugenes-MacBook-Pro$
echo "Hellow World!"
> Hellow World!
> How are ye doin?
> What about ` this?
```

```md
> :Button
```

```js | --term
import /*~err~*/chalk/*~err~*/ from 'chalk';
console.log(chalk`{hex('#f05454') ERROR:} You suck!`);
> {hex('#f05454') ERROR:} You suck!
console.log(chalk`{bold.green WARN:} But ...`);
> {bold.green WARN:} But ...
```
> :Buttons
> > :CopyButton

```csharp
public Option<int> method() =>
  new Dictionary<int, int>()./*~warn~*/TryGetValue/*~warn~*/(0);
}
```

> :Footnotes

```fsharp
(*~warn~*)hellow(*~warn~*) world;
```

> :Buttons
> > :Button label=First Line, url=#code1-l1:l1
>
> > :Button label=Second Line, url=#code1-l2:l2

```tsx
import { RendererLike } from '@connectv/html';
import { File } from 'rxline/fs';
/*!*/import { Page, Meta, ContentNav, Fonts, ToC, GithubSearch$ } from '@codedoc/core/components';

import { config } from '../config';
/*+*/import { Header } from './header';
/*-*/import { Footer } from './footer';


export function content(_content: HTMLElement, toc: HTMLElement, renderer: RendererLike<any, any>, file: File<string>) {
  return (
    <Page title={config.page.title.extractor(_content, config, file)}
          favicon={config.page.favicon}
          meta={<Meta {...config.page.meta}/>}
          fonts={<Fonts {...config.page.fonts}/>}

          scripts={config.page.scripts}
          stylesheets={config.page.stylesheets}

          header={<Header {...config}/>}
          footer={<Footer {...config}/>}
          toc={
            <ToC default="open"                  // --> change this line.
              search={
                  config.misc?.github ? 
                  <GithubSearch$
                    repo={config.misc.github.rep}
                    user={config.misc.github.user}
                    root={config.src.base}
                    pick={config.src.pick.source}
                    drop={config.src.drop.source}
                  /> : false
              }>{toc}</ToC>
          }>
      {_content}
      <ContentNav content={_content}/>
    </Page>
  )
}
```

> :Buttons
> > :Button label=Click ME!, url=/docs/doc

## The standard Lorem Ipsum passage, used since the 1500s

"Lorem ipsum dolor sit amet, consectetur[Also maybe this is important](:Footnote) adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

## Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC

"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt[](:Footnote (id=second)). Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae[is this important too?](:Footnote) consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

```go
func /*~warn~*/whatev()/*~warn~*/ int {
  /*~*/return 0/*~*/
}
```

> :Footnotes

> :ToCPrevNext