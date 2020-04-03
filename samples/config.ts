import { configuration } from '../src/config';


export const config = configuration({
  src: {
    base: 'samples/md'
  },
  dest: {
    bundle: 'assets',
    html: 'dist',
  },
  title: {
    base: 'Codedoc Sample'
  },
  misc: {
    github: {
      user: 'CONNECT-platform',
      repo: 'codedoc',
    },
    gitter: {
      room: 'connectv/community',
    },
  }
});
