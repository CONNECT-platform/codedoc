import { ConfigOverride } from '../../config/override.type';

import { Formula } from './component';
import { InlineFormula } from './inline';
import { enableFormula } from './post';
import { zoomOnFormula$ } from './zoom-on-formula';


export function formulaPlugin(): ConfigOverride {
  return {
    markdown: {
      customComponents: { Formula },
      customInlineComponents: { Formula: InlineFormula }
    },
    tocMarkdown: {
      customComponents: { Formula },
      customInlineComponents: { Formula: InlineFormula }
    },
    page: {
      post: [enableFormula]
    },
    bundle: {
      init: [zoomOnFormula$]
    }
  }
}
