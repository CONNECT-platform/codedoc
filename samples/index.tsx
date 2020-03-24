import { compile } from '@connectv/sdh';

import { Page } from '../src/components/page';



compile(renderer => <Page/>).save('dist/index.html');