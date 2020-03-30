import { RendererLike } from '@connectv/html';
import { Button } from './button';


export function CopyButton(_: any, renderer: RendererLike<any, any>) {
  return <Button icon='true' onclick='smartCopy(this)' label='filter_none'/>;
}

