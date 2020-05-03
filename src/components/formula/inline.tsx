import { renderToString } from 'katex';
import { RendererLike } from '@connectv/html';


export function InlineFormula(
  _: {},
  renderer: RendererLike<any, any>,
  content: any
) {
  const marker = <marker>{content}</marker>;
  return <span _innerHTML={renderToString(marker.textContent || '')}/>
}
