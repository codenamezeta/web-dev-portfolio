# Portfolio content (Markdown)

Add one **`.md` file per project**. The filename (without `.md`) becomes the URL slug, e.g. `my-app.md` → `/portfolio/my-app`.

## Frontmatter (YAML at the top)

```yaml
---
title: Project Title
category: Client | Personal | Learning
publishedAt: 2025-01-15
description: Short description for listings and meta.
liveUrl: https://...        # optional
sourceUrl: https://github.com/...   # optional
image: /imgs/hero.jpg       # optional
---
```

## Body

Use normal **Markdown**:

- **Headings**: `##`, `###`, `####`
- **Code blocks**: ` ```typescript ` (or `js`, `tsx`, `css`, etc.)
- **Images**: `![alt text](/path/to/image.jpg)` — caption with *italic* on the next line
- **Embeds** (YouTube, CodePen): paste raw `<iframe ...></iframe>` HTML; it will be rendered (use trusted sources only)

No database or CMS required. Edit these files and the site will show the updates on the next build or dev refresh.
