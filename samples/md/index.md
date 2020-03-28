# Halo

This is the first page of codedoc. You can [go to this link](https://www.google.com) for example.

```bash
npm i @connectv/html
```

```tsx
import { state, filter, map } from '@connectv/core';
import { Renderer } from '@connectv/html';

let renderer = new Renderer();

let name = state('World');

renderer.render(
  <fragment>
    <input type='text' placeholder='type a name ...' _state={name}/>
    <br/>
    <p>Hellow {name.to(filter(x => x.toLowerCase() != 'donald'))}</p>
  </fragment>
).on(document.body);
```

> :Buttons
> > :Button label=COPY
>
> > :Button url=https://www.google.com, label=play_arrow, icon=true

Also I would like to write some stuff here to see what would happen if some other text appears here and there.

> ⚠️⚠️**WARNING**
>
> Be careful with how you use this.