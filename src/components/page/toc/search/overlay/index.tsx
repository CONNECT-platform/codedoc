import { state, sink, pipe, pin, map, pack, emission, filter } from '@connectv/core';
import { debounceTime, startWith, share } from 'rxjs/operators';
import { RendererLike, ref } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../../theme';
import { ToCSearchOverlayStyle } from './style';
import { Loading } from '../../../../util/loading';


export interface ToCSearchOverlayOptions {
  placeholder: string;
  query: any;
  results: any;
}


export function ToCSearchOverlay(
  this: ThemedComponentThis<CodedocTheme>,
  options: ToCSearchOverlayOptions,
  renderer: RendererLike<any, any>,
) {
  const classes = this.theme.classes(ToCSearchOverlayStyle);
  const holder = ref<HTMLElement>();
  const input = ref<HTMLInputElement>();

  this.track({
    bind() {
      input.$.focus();
      holder.$.classList.add('active');
    }
  });

  const query = state('');
  const loading = state(false);

  const queryOut = this.expose.out('query');
  const results = this.expose.in('results', pin())
    .to(pipe(share()))
    .to(pipe(startWith(emission([]))))
  ;

  query
    .to(filter((q: string) => q && q.trim().length > 0))
    .to(
      loading.from(map(() => true)),
      queryOut.from(pipe(debounceTime(1000)))
    );

  results.to(map(() => false)).to(loading);

  const hideEmpty =
    pack(query, results, loading)
    .to(map(([_query, _results, _loading]: any) => {
      if (_loading) return true;
      else return !_query || _query.trim().length == 0 || _results.length > 0;
    }));


  return <div class={classes.overlay} _ref={holder} onkeydown={event => {
    if ((event as KeyboardEvent).key === 'Escape')
      holder.$.remove();
  }}>
    <div class={classes.content}>
      <div class="top">
        <input placeholder={options.placeholder} type="text" _ref={input} _state={query}/>
        <div class={classes.close} onclick={() => holder.$.remove()}/>
      </div>
      <div class={classes.results}>
        <div class="loading" hidden={loading.to(map((_: boolean) => !_))}><Loading/></div>
        <div class="empty" hidden={hideEmpty}>No Results!</div>
      </div>
    </div>
  </div>
}
