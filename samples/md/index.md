> :DarkLight
> > :InLight
> >
> > ![header](/repo-banner.svg)
>
> > :InDark
> >
> > ![header](/repo-banner-dark.svg)

# For Musti

This is the first page of codedoc. You can [go to this link](https://www.google.com) for example.
And also some text that has some `code element` within it.

```bash
npm i @connectv/html
```

````
```go
func whatev() int {
  return 0
}
```
````

```tsx | todolist.tsx
import { state, map } from '@connectv/core';                         // @see https://connective.dev
import { List, ref, autoId, Renderer } from '@connectv/html';        // @see [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html)

export function NotATodoList({}, renderer: Renderer) {               // --> how you define a component
  let items = state([]);                                             // --> keep the state of items
  let input = ref();                                                 // --> a reference for the 'new item input'

  return <fragment>
    <ul>
/*!*/      <List of={items} each={item =>                                 // --> the list of the items
/*!*/        <li onclick={() => {                                         // --> when an item is clicked ...
/*!*/          items.value = items.value.filter(i => i !== item.value)    // --> ... remove it from all items
/*!*/        }}>
/*!*/          {item.sub('title')}                                       {/* --> display each item's title */}
/*!*/        </li>
/*!*/      } key={i => i.id}/>                                           {/* --> identify each item by its id */}
    </ul>
    <input placeholder='Add an item ...' type='text' _ref={input}/>
    <button onclick={() => {
      items.value = items.value.concat([{ 
        title: input.$.value, i
        d: autoId() 
      }]);
      input.$.value = '';
    }}>
      Add #{items.to(map(l => l.length + 1))}
    </button>
  </fragment>
}

let renderer = new Renderer();                                       // --> create the renderer
renderer.render(<NotATodoList/>).on(document.body);                  // --> render the component on document
```

> :Buttons
> > :CopyButton
>
> > :Button url=https://www.google.com, label=TRY IT!

## Also This Section

````md
# Hellow world!

```tsx
const x = 2;
```
````

Also I would like to write some stuff here to see what would happen if some other text appears here and there.

> ⚠️⚠️**WARNING**
>
> Be careful with how you use this.

> :Card
>
> Hellow this is my card

### Even A Section Like `This`

> :Tabs
> > :Tab title=main
> >
> > ```tsx | main.tsx
> > import { compile } from '@connectv/sdh';     // @see [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh)
> > import { Card } from './card';               // @see [Component code](tab:component)
> > 
> > compile(renderer => 
> >   <fragment>
> >/*!*/     <h1>List of stuff</h1>
> >/*!*/     <Card title='🥕Carrots' text='they are pretty good for you.'/>
> >   </fragment>
> > ).save('dist/index.html');
> > ```
>
> > :Tab title=component
> > 
> > ```tsx | card.tsx
> > const style = `
> >   display: inline-block;
> >   vertical-align: top;
> >   padding: 8px;
> >   border-radius: 8px;
> >   margin: 8px;
> >   box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
> > `;
> > 
> > export function Card({ title, text }, renderer) {
> >   return <div style={style}>
> >       <h2>{title}</h2>
> >       <p>{text}</p>
> >     </div>
> > }
> > ```
>
> > :Tab title=preview, icon=airplay
> >
> > <iframe deferred-src="https://r3b8i.sse.codesandbox.io/" height="320"/>

Perhaps some text here, some text there.

Some text some text every motherfreaking where.

## And Also this

- ho ho ho
- he he he
- ha haha


> :ToCPrevNext