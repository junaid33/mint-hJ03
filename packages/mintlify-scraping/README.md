# @mintlify/scraping

Scrape documentation frameworks to Mintlify docs.

## Commands

- `mintlify-scrape section [url]` - scrapes multiple pages in a site
- `mintlify-scrape page [url]` - scrapes a single page in a site

### Overwriting

Add the `--overwrite` flag if they want to overwrite their current files.

## Frameworks

We currently support:

- Docusaurus
- GitBook
- ReadMe
- Intercom

The commands will automatically detect the framework.

## 🚀 Installation

One time use:

```
npx @mintlify/scraping@latest section [url]
```

```
npx @mintlify/scraping@latest page [url]
```

Global installation:

```
npm install @mintlify/scraping@latest -g
```

Global usage:

```
mintlify-scrape section [url]
```

```
mintlify-scrape page [url]
```

## Community

Join our Discord community if you have questions or just want to chat:

[![](https://dcbadge.vercel.app/api/server/ACREKdwjG5)](https://discord.gg/ACREKdwjG5)

_Built with 💚 by the Mintlify community._