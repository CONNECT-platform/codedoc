import { ConfigOverride } from "../src";

import { Card } from './components/card';


export function samplePlugin(): ConfigOverride {
  return {
    markdown: {
      customComponents: {
        Card,
      }
    },
    page: {
      title: {
        base: 'XX',
        connector: ' > '
      },
      post: [
        (html, file) => {
          html.body.classList.add('POST-PROCESS');
          html.body.setAttribute('data-path', file.path);
        }, 
      ]
    }
  }
}
