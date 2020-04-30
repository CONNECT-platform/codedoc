![CODEDOC](https://raw.githubusercontent.com/CONNECT-platform/codedoc/master/repo-banner.svg?sanitize=true)


```bash
npm i -g @codedoc/cli
```

**CODEDOC** is an open-source tool that helps you with creating beautiful and modern software documentation. It creates a JAMStack app from your markdown files that you can easily deploy on services such as GitHub Pages. [Read the docs for more info](https://codedoc.cc).

<br><br>

# Installation

```bash
npm i -g @codedoc/cli

cd my-project
codedoc init
```

[Read the docs for more info](https://codedoc.cc/docs/cli#setting-up-a-project).

<br><br>

# Usage

```bash
codedoc serve
```

Modify your markdown files (by default in `docs/md/`, for example `docs/md/index.md`) and see changes in real time. When you are done, build your documentations for deployment:

```bash
codedoc build
```

and if you are for example using GitHub Pages, deploy by pushing:

```bash
git add -A
git commit -m "added docs"
git push
```

[Read the docs for more info](https://codedoc.cc).

<br><br>

# Prior Work

While there are multiple frameworks and tools that help with building websites from a bunch of markdown files, I will only focus on those who are specifically designed for writing documentation/wikis, since the rest naturally come with a configuration overhead. You can [read this section](https://codedoc.cc/#features) for more info on **CODEDOC**'s features compared to the works mentioned here.

## Jekyll

A lot of the ideas of the workflow are shared between Jekyll and **CODEDOC**. The reason I created **CODEDOC** despite Jekyll being out there because:

- Jekyll is a bit old-school and hence heavy handed by modern frontend standards (no component structure, etc),
- Jekyll's themes are not up to modern standards, and it is quite some work to create new themes,
- Jekyll is not yet specifically designed for documentation and project wikis (thats why GitHub has a separate wiki section for projects despite supporting Jekyll out of the box).

## GitBook

GitBook is a nice SaaS built specifically for documentation and project wikis. However:
- It lacks some essential features (such as code-snippet hints),
- It hides some essential features behind a paywall (for example the dark mode), which hurts open-source projects,
- It is not customizable enough for my taste.

<br><br>

# Acknowledgements

The following tools and open-source libraries are used by **CODEDOC**, so shout-out to their creators/maintainers/collaborators:

[**webpack**](https://webpack.js.org)\
Used by [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh) as client-side code bundler. CONNECTIVE SDH is the basis of server-side/client-side rendering and components of **CODEDOC**.

[**jsdom**](https://github.com/jsdom/jsdom), [**jsdom-global**](https://github.com/rstacruz/jsdom-global)\
Used by [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh) for ease of HTML element creation on the server side.

[**Marked.js**](https://marked.js.org/)\
Used by [@connectv/marked](https://github.com/CONNECT-platform/marked) as markdown processor (@connectv/marked enables using TSX-components for processing markdown and powers the custom components system).

[**JSS**](https://cssinjs.org)\
Used by [CONNECTIVE JSS Theme](https://github.com/CONNECT-platform/connective-jss-theme) which is the themed-component library used by **CODEDOC**.

[**Prism**](https://prismjs.com)\
Used for syntax highlighting in code snippets.

[**Color Hunt**](https://colorhunt.co/)\
For picking the default colors (also thanks to Niyousha Karimi for helping on that front, besides helping with usability testing).

[**RxJS**](https://rxjs-dev.firebaseapp.com)\
Used by [CONNECTIVE](https://github.com/CONNECT-platform/connective), [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html) (which is the TSX-Component library behind **CODEDOC** components) for client-side interactions 
and [RxLine](https://github.com/loreanvictor/rxline) for asynchronous build process.

[**ts-node**](https://github.com/TypeStrong/ts-node), [**ts-node-dev**](https://github.com/whitecolor/ts-node-dev)\
Used by the CLI to run the build process and watch over markdown/config files.

[**Express**](https://expressjs.com)\
Used for the local development server.

[**ShellJS**](https://github.com/shelljs/shelljs), [**chalk**](https://github.com/chalk/chalk)\
Powering the CLI and making it look nice.

[**select**](https://github.com/zenorocha/select)\
Used for convenient copy-to-clipboard functionality.

[**KaTeX**](https://katex.org)\
Used for rendering LaTeX formulas.

[**color**](https://github.com/Qix-/color)\
Used for automatic color deduction/manipulation.
