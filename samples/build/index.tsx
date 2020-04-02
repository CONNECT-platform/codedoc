import { build } from '../../src/build';

import { config } from '../config';
import { installTheme$ } from './theme';
import { content } from './content';


build(config, {
  content
}, installTheme$);
