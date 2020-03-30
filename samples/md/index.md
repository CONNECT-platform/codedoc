# Halo

This is the first page of codedoc. You can [go to this link](https://www.google.com) for example.

```bash
npm i @connectv/html
```

```tsx
import { state, map } from '@connectv/core';
import { List, ref, autoId, Renderer } from '@connectv/html';

export function NotATodoList({}, renderer: Renderer) {               // --> how you define a component
  let items = state([]);                                             // --> keep the state of items
  let input = ref();                                                 // --> a reference for the 'new item input'

  return <fragment>
    <ul>
/*!*/      <List of={items} each={item =>                                 // --> the list of the items
/*!*/        <li onclick={() => {                                         // --> when an item is clicked
/*!*/          items.value = items.value.filter(i => i !== item.value)    // ... remove it from all items
/*!*/        }}>
/*!*/          {item.sub('title')}
/*!*/        </li>
/*!*/      } key={i => i.id}/>
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

Also I would like to write some stuff here to see what would happen if some other text appears here and there.

> ⚠️⚠️**WARNING**
>
> Be careful with how you use this.