import { RendererLike } from '@connectv/html';


export interface MetaOptions {
  subject?: string;
  description?: string;
  keywords?: string[];
  themeColor?: string;
  appleMobileWebStatusBarStyle?: string;
}


export function Meta(options: MetaOptions, renderer: RendererLike<any, any>) {
  return <fragment>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>

    {options.subject ? <meta name="subject" content={options.subject}/> : ''}

    <meta name="robots" content='index,follow'/>

    {options.description ? <meta name="description" content={options.description}/> : ''}
    {options.keywords ? <meta name="keywords" content={options.keywords.join(', ')}/>: ''}

    <meta name="theme-color" content={options.themeColor || '#212121'}/>
    <meta name="apple-mobile-web-app-status-bar-style" 
          content={options.appleMobileWebStatusBarStyle || 'black-translucent'}/>
  </fragment>;
}