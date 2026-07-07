# Blog content

Drop `.mdx` files in this folder to publish articles — nothing else needs to change.

Each file needs frontmatter:

```mdx
---
title: "Your title"
excerpt: "One sentence shown on the blog index."
date: "2026-07-07"
---

Article body in Markdown/MDX goes here.
```

The slug is the filename (`my-post.mdx` → `/blog/my-post`). The blog index renders
a real empty state when this folder has no `.mdx` files — no placeholder posts.
