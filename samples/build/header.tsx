import { CodedocConfig } from '../../src/config';
import { Header } from '../../src/components/page/header';
import { GithubButton } from '../../src/components/misc/github';
import { Watermark } from '../../src/components/misc/watermark';


export const header = (config: CodedocConfig, renderer: any) =>
  <Header>{config.misc?.github ?
    <fragment>
      <GithubButton action='Star'
        repo={config.misc.github.repo}
        user={config.misc.github.user}
        count={true}
        standardIcon={true}/>
      <br/><br/>
    </fragment>
    : ''}
    <Watermark/>
  </Header>
