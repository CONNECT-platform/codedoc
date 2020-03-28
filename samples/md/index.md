# Halo

This is the first page of codedoc. You can [go to this link](https://www.google.com) for example.

```bash
npm i @connectv/html
```

```tsx
/*!*/import { Renderer } from '@connectv/html';

const MyComp = ({ name }, renderer) => <div>Hellow {name}!</div>

const renderer = new Renderer();                       // --> also lets write some stuff here that would make this line pretty long ...
renderer.render(
  <fragment>
/*!*/    <MyComp name='World'/>
/*!*/    <MyComp name='Fellas'/>
  </fragment>
)
.on(document.body);
```

> :Buttons
> > :Button label=COPY
>
> > :Button url=https://www.google.com, label=play_arrow, icon=true

Also I would like to write some stuff here to see what would happen if some other text appears here and there.

> ⚠️⚠️**WARNING**
>
> Be careful with how you use this.