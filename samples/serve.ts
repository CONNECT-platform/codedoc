import { join } from 'path';
import { serve } from '../src/serve';

import { config } from './config';
import { content } from './build/content';
import { installTheme$ } from './build/theme';


const root = join(__dirname, '../');

serve(root, config, { content }, installTheme$);
