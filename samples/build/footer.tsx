import { CodedocConfig } from '../../src/config';
import { Footer } from '../../src/components/page/footer';
import { GitterToggle$ } from '../../src/components/misc/gitter';
import { Watermark } from '../../src/components/misc/watermark';


export const footer = (config: CodedocConfig, renderer: any) => {
  let github$;
  if (config.misc?.github)
    github$ = <a href={`https://github.com/${config.misc.github.user}/${config.misc.github.repo}/`} 
                target="_blank">GitHub</a>;

  let community$;
  if (config.misc?.gitter)
    community$ = <GitterToggle$ room={config.misc.gitter.room}/>

  if (github$ && community$) return <Footer>{github$}<hr/>{community$}</Footer>;
  else if (github$) return <Footer>{github$}</Footer>;
  else if (community$) return <Footer>{community$}</Footer>;
  else return <Footer><Watermark/></Footer>;
}
