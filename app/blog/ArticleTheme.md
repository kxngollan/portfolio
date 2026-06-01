# ArticleTheme.md

A clean editorial article theme for a personal blog, inspired by the **Ollan Muza** demo design. This theme is intended for a thoughtful, minimalist personal site focused on technology, creativity, life, and ideas.

---

## Theme Name

**Ollan Editorial**

## Purpose

Create a calm, premium reading experience for long-form personal essays, technical reflections, creative notes, and lifestyle articles.

The article page should feel:

- Thoughtful
- Minimal
- Editorial
- Warm
- Personal
- Spacious
- Easy to read

---

## Page Structure

```txt
Article Page
├── Header / Navigation
├── Article Hero
│   ├── Category
│   ├── Title
│   ├── Subtitle
│   ├── Author Byline
│   └── Featured Image
├── Main Article Layout
│   ├── Share Rail
│   ├── Article Body
│   └── Sidebar
│       ├── Table of Contents
│       ├── About the Author
│       ├── Newsletter Signup
│       └── Article Metadata
├── Related Articles
└── Footer
```

---

## Header

The header should be simple and consistent across the blog.

### Content

```txt
[OM] Ollan Muza

Home    Articles    About    Projects    Contact

Search Icon    Theme Toggle Icon
```

### Style

- White or warm off-white background
- Thin bottom border
- Left-aligned monogram logo
- Serif site name
- Centered navigation
- Active navigation item underlined
- Minimal icon buttons on the right

---

## Article Hero

The article hero introduces the post with strong editorial hierarchy.

### Example Content

```txt
CREATIVITY

Building a Life of Thoughtful Work

How to design your days around focus, curiosity,
and contribution in a world full of noise.

By Ollan Muza    Apr 28, 2024    6 min read
```

### Featured Image

Use a wide rounded image below the byline.

Recommended image style:

- Warm desk scene
- Notebook, books, coffee, pen, window light
- Soft shadows
- Natural tones
- Calm creative atmosphere

### Style

- Large serif title
- Small uppercase category label
- Muted subtitle
- Compact byline row
- Rounded image corners
- Generous spacing above and below

---

## Article Layout

Use a two-column desktop layout.

```txt
| Share Rail | Main Article Content | Sidebar |
```

### Desktop Widths

```css
page-max-width: 1200px;
article-content-width: 680px;
sidebar-width: 280px;
share-rail-width: 80px;
```

### Mobile Layout

On smaller screens:

- Stack everything into one column
- Hide or move the share rail below the article title
- Sidebar cards should appear after the article body
- Table of contents can become collapsible

---

## Share Rail

A slim vertical sharing column beside the article body.

### Content

```txt
Share this article
Twitter / X
LinkedIn
Email
Copy Link
```

### Style

- Small label
- Vertical icon stack
- Subtle hover state
- Muted gray icons
- Sticky positioning optional

---

## Article Body

The article body should prioritize readability.

### Typography

```css
body-font: Inter, system-ui, sans-serif;
heading-font: Playfair Display, Georgia, serif;
body-size: 17px;
body-line-height: 1.75;
body-color: #2b2926;
muted-text: #6f6a64;
```

### Example Body Content

```md
We talk a lot about productivity, but not enough about purpose. Thoughtful work isn’t about doing more — it’s about doing what matters, with intention and care.

Over the years, I’ve learned that the quality of our lives is directly shaped by the quality of our attention. Where we focus, we move. Where we move, we create. And over time, those small choices compound into a body of work we can be proud of.

## 1. Start With Clarity

Before you plan your week, get clear on what you want your work to mean. Ask yourself: What problems do I care about? What skills do I want to grow? What kind of impact do I want to make?

> Clarity is the first act of kindness you can give to your future self.

When your direction is clear, daily decisions get easier — and your energy stops leaking.

## 2. Protect Deep Work

Deep work is where the real progress happens. It requires time, focus, and protection. Turn off notifications, close extra tabs, and go all in.

Even 90 minutes of undistracted focus can move a project forward in ways that hours of shallow work cannot.

## 3. Make Space for Curiosity

Some of the best ideas come from unstructured time. Read widely. Take walks. Ask questions. Curiosity is the fuel for meaningful work.

Build a life that supports your best thinking — and your best thinking will build a life you’re proud of.
```

---

## Pull Quote

Use pull quotes sparingly to emphasize the article’s central idea.

### Example

```md
> Clarity is the first act of kindness you can give to your future self.
```

### Style

```css
border-left: 3px solid #b88a5a;
padding-left: 1rem;
font-style: italic;
color: #3a352f;
background: transparent;
```

---

## Inline Content Card

Use inline cards to promote related ideas, resources, or follow-up reading.

### Example

```txt
[Image]
Design Systems, For Your Life
Just like in code, systems bring freedom. Create routines and environments that support deep work.
Read more about building better systems →
```

### Style

- Horizontal card on desktop
- Image on the left
- Text on the right
- Rounded corners
- Thin border
- Soft shadow
- Warm neutral background

---

## Sidebar

The sidebar supports navigation and conversion without distracting from the article.

---

### Table of Contents Card

```txt
On this page

1. Start With Clarity
2. Protect Deep Work
3. Make Space for Curiosity
4. Ship and Share Your Work
5. Keep Learning and Evolving
```

Style:

- White card
- Rounded corners
- Subtle shadow
- Active item has left accent line
- Sticky on desktop

---

### About the Author Card

```txt
About the Author

[Author Image]
Ollan Muza

I write about technology, creativity, life, and ideas. Building things and sharing what I learn along the way.

Learn more about me →
```

Style:

- Circular author image
- Compact bio
- Warm, personal tone
- Text link with arrow

---

### Newsletter Card

```txt
Thoughtful reads, once a week.

Ideas and insights on technology, creativity, and life — straight to your inbox.

[Your email address] [Subscribe]

No spam. Unsubscribe anytime.
```

Style:

- Clear heading
- Simple email input
- Dark primary button
- Small reassurance text

---

### Article Metadata Card

```txt
Published
Apr 28, 2024

Reading time
6 min read

Category
Creativity

Tags
Productivity    Focus    Mindset    Habits    Creativity
```

Style:

- Small icon per metadata row
- Tag pills
- Muted labels
- Clear values

---

## Related Articles

At the bottom of the article, show 3 related posts.

### Example

```txt
More articles you might enjoy                         View all articles →

[Technology Card]  The Calm Code: Writing Software That Lasts
[Life Card]        Choosing Presence in a Distracted World
[Creativity Card]  Daily Sketches, Better Ideas
```

### Style

- Horizontal cards on desktop
- Stacked cards on mobile
- Small thumbnail image
- Category label
- Article title
- Date and reading time

---

## Footer

Footer should mirror the homepage footer.

### Content

```txt
[OM] Ollan Muza
Thoughtful writing on technology, creativity, life, and ideas.
Thanks for being here.

Navigate
Home
Articles
About
Projects
Contact

Topics
Technology
Creativity
Life
Productivity
Design

Let’s connect
Have a project, idea, or just want to say hi?
I’d love to hear from you.

[Send a message →]

© 2024 Ollan Muza. All rights reserved.
Privacy Policy    Terms of Use
```

---

## Color Palette

```css
--color-background: #fbfaf7;
--color-surface: #ffffff;
--color-text: #1f1d1a;
--color-muted: #6f6a64;
--color-border: #e8e2da;
--color-accent: #b88a5a;
--color-accent-soft: #eee4d8;
--color-button: #151515;
--color-button-text: #ffffff;
```

---

## Typography

### Recommended Fonts

```css
--font-heading: "Playfair Display", Georgia, serif;
--font-body: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Type Scale

```css
site-title: 28px;
article-title: clamp(42px, 6vw, 72px);
section-heading: 28px;
body-copy: 17px;
small-text: 13px;
category-label: 12px uppercase letter-spaced;
```

---

## Spacing

```css
--space-xs: 0.5rem;
--space-sm: 0.75rem;
--space-md: 1rem;
--space-lg: 1.5rem;
--space-xl: 2.5rem;
--space-2xl: 4rem;
--space-3xl: 6rem;
```

---

## Border Radius

```css
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 20px;
--radius-full: 999px;
```

---

## Shadows

```css
--shadow-card: 0 12px 30px rgba(31, 29, 26, 0.06);
--shadow-soft: 0 6px 18px rgba(31, 29, 26, 0.04);
```

---

## Component Checklist

- [x] Header navigation
- [x] Logo / wordmark
- [x] Article category
- [x] Article title
- [x] Subtitle
- [x] Author byline
- [x] Featured image
- [x] Share rail
- [x] Article body
- [x] Pull quote
- [x] Inline related content card
- [x] Table of contents
- [x] Author card
- [x] Newsletter card
- [x] Metadata card
- [x] Related articles
- [x] Footer

---

## Example Frontmatter

```yaml
title: "Building a Life of Thoughtful Work"
description: "How to design your days around focus, curiosity, and contribution in a world full of noise."
category: "Creativity"
author: "Ollan Muza"
publishedAt: "2024-04-28"
readingTime: "6 min read"
tags:
  - Productivity
  - Focus
  - Mindset
  - Habits
  - Creativity
featuredImage: "/images/articles/thoughtful-work.jpg"
```

---

## Design Notes

This theme should avoid visual clutter. The goal is not to overwhelm the reader with widgets, but to create a quiet, premium, personal space for ideas.

Use the sidebar for useful support only. The main article content should always remain the focus.

The ideal impression is:

> “A calm digital notebook for serious, thoughtful writing.”
