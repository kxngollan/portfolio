# Portfolio Theme & Design System

## Color Palette

### Primary Colors

- **Primary Background**: `#1c1c22` - Dark background used in page transitions and main theme
- **Primary Accent**: `hsl(75, 94%, 57%)` - Bright lime/yellow-green accent color
  - Hover State: `hsl(90, 94%, 57%)` - Slightly more yellow on hover

### Secondary Colors

- **Orange Highlight**: `#ffa351` - Used extensively for text highlights, headings, and interactive elements
- **Cyan/Teal**: `#64FFDB` - Used for tech stack section headers
- **Slate**: `slate-600/70` (with 70% opacity) - Tech stack tag borders

### Light Mode Colors

- **Background**: `#ffffff` - Pure white
- **Foreground**: `#171717` - Dark gray/near-black text

### Dark Mode Colors

- **Background**: `#0a0a0a` - Very dark background
- **Foreground**: `#ededed` - Light gray text
- **Off-white Text**: `#fdffe0` - Cream/off-white for mobile nav and alternate text

### Component-Specific Colors

- **Footer Border**: `#0a0d14` - Dark border color
- **Footer Hover**: `#ffa351` - Orange on hover (links in footer)
- **Tech Stack Text**: `#8892b0` - Muted blue-gray for tech tags
- **Social Icons Background**: `#e6e6e6cf` - Light gray with opacity
- **Hover Background (Light)**: `rgb(227, 214, 195)` - Warm beige/tan
- **Hover Background (Dark)**: `rgb(30, 28, 25)` - Dark brown/charcoal
- **Mobile Nav Background**: `#000000` - Pure black

---

## Typography

### Font Families

- **Primary Font**: `JetBrains Mono` - Monospace font for main content
- **Fallback Fonts**:
  - `Geist Sans` - Alternative sans-serif
  - `Geist Mono` - Alternative monospace
  - System default: `Arial, Helvetica, sans-serif`

### Font Sizes (via Tailwind classes)

- Headings: h1, h2, h3 (custom sized)
- Text: Various sizes including `text-xl`, `text-base`, `text-sm`, etc.
- Subtitle/Labels: `text-[0.75rem]` - Extra small for tags and labels

### Font Weights & Styling

- **Bold/Heavy**: `font-black`, `font-bold`, `font-semibold`
- **Letter Spacing**:
  - `tracking-[2px]` - Wide tracking on buttons
  - `tracking-[0.18em]` - Used for employer names
  - `tracking-wide` - Generic wide spacing

---

## Responsive Design

### Breakpoints

- **sm**: 640px - Small screens (tablets)
- **md**: 768px - Medium screens (larger tablets)
- **lg**: 960px - Large screens (desktops)
- **xl**: 1200px - Extra large screens (wide desktops)
- **2xl**: 2000px - Ultra-wide screens

### Container Settings

- **Max Width**: Container centered with `mx-auto`
- **Padding**: `15px` default container padding

---

## Interactive Elements

### Buttons

- **Default State**:
  - Border: `border-accent` (lime/yellow-green)
  - Background: Transparent
  - Text: `text-accent`
  - Padding: `h-[46px] px-6`
  - Shape: `rounded-full`
  - Text Style: Uppercase, `tracking-[2px]`, `font-semibold`, `text-[14px]`

- **Hover State**:
  - Text Color: `#ffa351` (orange)
  - Background: `rgb(227, 214, 195)` (light mode) / `rgb(30, 28, 25)` (dark mode)
  - Border: `#ffa351` (orange)
  - Transition: `transition-colors`

### Links & Social Icons

- **Default**: Border with accent color, circular shape
- **Hover**:
  - Text: `#ffa351` (orange)
  - Background: `rgb(227, 214, 195)` (light) / `rgb(30, 28, 25)` (dark)
  - Transition: `transition-all duration-500`
  - Border: `#ffa351` (orange)

### Cards/Projects

- **Background**: Transparent with hover effects
- **Border Bottom**: Dynamic border on hover
- **Hover Background**: `rgb(30, 28, 25)` (light condition) / `rgb(227, 214, 195)` (dark)
- **Transition**: `transition-all duration-300`

---

## Spacing & Layout

### Gap Spacing

- Buttons/Sections: `gap-4`, `gap-6`
- Cards: `gap-10` (md: `gap-14`)
- Icons: `gap-2` for tight spacing, `gap-4` for medium

### Padding

- Footer: `30px`
- Container padding: `15px`
- Section content: `pt-0 pb-12` / `xl:pt-0 xl:pb-5`

### Margins

- Header elements: `mt-1`, `mb-3`, `mb-5`
- Social sections: `mb-8` (mobile), `xl:mb-0` (desktop)

---

## Animations & Transitions

### Built-in Library

- Uses `framer-motion` for complex animations
- Tailwind CSS animations via `tailwindcss-animate` plugin

### Common Transition Effects

- Duration: `duration-300` (cards), `duration-500` (hover effects)
- Type: `transition-colors`, `transition-all`
- Timing: Smooth easing (default)

### Page Transitions

- Stair transition component for page changes
- Fade/slide effects on route changes

---

## Dark Mode

### Implementation

- CSS Variables approach with `@media (prefers-color-scheme: dark)`
- Tailwind `darkMode: ["class"]` for class-based toggle

### Dark Mode Color Overrides

- All backgrounds shift to `#0a0a0a`
- Text shifts to `#ededed`
- Hover backgrounds: `rgb(30, 28, 25)` (darker brown)
- Accent usage remains consistent with `#ffa351`

---

## Border & Border Radius

### Borders

- Footer: `2px solid #0a0d14`
- Buttons/Links: `border-accent` (dynamic)
- Social Icons: `border border-accent`
- Tags: `border border-slate-600/70`

### Border Radius

- **Rounded Full**: `rounded-full` - Circles for buttons and icon containers
- **Rounded Large**: `rounded-2xl` - Used for active state backgrounds
- **Rounded Medium**: `rounded-lg` - Card and content containers

---

## Text Alignment & Display

### Text Alignment

- Center: `text-center`
- Left: `text-left`
- Right: `text-right` (right-aligned for alternating cards)

### Flex & Grid

- **Hero Section**: `flex flex-col xl:flex-row` - Stacks on mobile, row on desktop
- **Experience**: `grid grid-cols-1 md:grid-cols-3` - Single column mobile, 3 columns desktop
- **Tech Stack**: `flex flex-wrap justify-center gap-8`

### Line Height

- Default: `leading-relaxed` (relaxed spacing)
- Snug: `leading-snug` (tight spacing)
- Footer links: `line-height: 24px`

---

## CSS Custom Properties (Variables)

```css
:root {
  --background: #ffffff (light) / #0a0a0a (dark) --foreground: #171717 (light) /
    #ededed (dark) --color-background: var(--background)
    --color-foreground: var(--foreground) --font-sans: var(--font-geist-sans)
    --font-mono: var(--font-geist-mono);
}
```

---

## Accessibility & UX Features

- **Focus States**: `ring-offset-white` for visual focus indicators
- **Cursor**: `cursor-pointer` on interactive elements
- **Pointer Events**: `pointer-events-none` on decorative overlays
- **Z-Index**: Proper stacking (transitions: top-0, fixed elements)
- **Whitespace**: `whitespace-nowrap` for preventing text wrapping on buttons

---

## Special Effects

### Photo/Image Elements

- Circular design with rounded containers
- Hover effects on project cards with color changes

### Mobile Navigation

- Background: `#000000` (black)
- Text: `#fdffe0` (cream/off-white)
- Slide-in animation from left
- Fixed positioning: `fixed top-0 left-0 h-screen w-[200px]`

### Decorative Elements

- Background transitions with primary color
- Fixed overlays for page transitions
- Stair transition effect on route changes

---

## Summary of Key Design Tokens

| Token               | Value                | Usage                         |
| ------------------- | -------------------- | ----------------------------- |
| Primary Brand       | `#1c1c22`            | Background, page transitions  |
| Accent Color        | `hsl(75, 94%, 57%)`  | Interactive elements, borders |
| Highlight Color     | `#ffa351`            | Text, hover states, CTAs      |
| Dark Background     | `#0a0a0a`            | Dark mode background          |
| Light Background    | `#ffffff`            | Light mode background         |
| Primary Font        | JetBrains Mono       | All text content              |
| Border Radius       | `rounded-full`       | Buttons, icons                |
| Transition Duration | 300-500ms            | Animations, hovers            |
| Light Hover BG      | `rgb(227, 214, 195)` | Button/link hover (light)     |
| Dark Hover BG       | `rgb(30, 28, 25)`    | Button/link hover (dark)      |
