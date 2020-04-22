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

While there are multiple frameworks and tools that help with building websites from a bunch of markdown files, I will only focus on those who are specifically designed for this purpose, since the rest naturally come with a configuration overhead.
You can [read this section](https://codedoc.cc/#features) for more info on **CODEDOC**'s features compared to the works mentioned here.

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


