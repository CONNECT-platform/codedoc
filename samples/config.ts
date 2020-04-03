import { configuration } from '../src/config';


export const config = configuration({
  src: {
    base: 'samples/md'
  },
  dest: {
    bundle: 'dist',
    html: 'dist',
  },
  bundle: {
    baseUrl: '.',
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
