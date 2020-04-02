import { CodedocConfig } from '../../src/config';
import { Footer } from '../../src/components/page/footer';


export const footer = (config: CodedocConfig, renderer: any) => {
  let github$;
  if (config.misc?.github)
    github$ = <a href={`https://github.com/${config.misc.github.user}/${config.misc.github.repo}/`} 
                target="_blank">GitHub</a>;

  let community$ = <a href="https://google.com">Community</a>;

  if (github$ && community$) return <Footer>{github$}<hr/>{community$}</Footer>;
  else if (github$) return <Footer>{github$}</Footer>;
  else if (community$) return <Footer>{community$}</Footer>;
  else return <Footer/>;
}
