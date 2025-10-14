# WanderLingo Design Guidelines

## Design Foundation

**Approach**: Reference-Based Hybrid (Airbnb warmth + Notion clarity)  
**Principles**: Travel-first warmth, instant comprehension, progressive disclosure, mobile-native

---

## Color System

### Light Mode (HSL)
- Primary: `220 75% 55%` | Hover: `220 75% 48%`
- Secondary: `142 60% 45%`
- BG: `0 0% 100%` | Surface: `220 15% 97%`
- Text: `220 20% 15%` (primary), `220 15% 45%` (secondary)
- Border: `220 15% 88%`

### Dark Mode
- Primary: `220 70% 60%` | Hover: `220 70% 68%`
- Secondary: `142 55% 50%`
- BG: `220 18% 10%` | Surface: `220 15% 14%`
- Text: `220 10% 95%` (primary), `220 12% 65%` (secondary)
- Border: `220 15% 22%`

### Semantic (context-adaptive)
Success `142 60% 45%` | Warning `38 90% 55%` | Error `0 70% 55%` | Info `210 75% 55%`

---

## Typography

**Fonts**: Manrope (headings), Inter (body/UI), JetBrains Mono (technical)

**Scale**:
- Display: 4xl-6xl (56-72px), bold
- H1: 3xl-4xl (36-48px), semibold
- H2: 2xl-3xl (28-36px), semibold
- H3: xl-2xl (20-28px), medium
- Body Large: lg (18px) - translations
- Body: base (16px)
- Small: sm (14px) - metadata
- Micro: xs (12px), medium - labels

---

## Layout

**Spacing Units**: 2, 4, 6, 8, 12, 16, 20, 24

**Containers**:
- Landing: `max-w-7xl`, full-width hero
- App shell: `max-w-6xl`
- Camera/Chat: `max-w-4xl`
- Library: `max-w-7xl`

**Grids**:
- Features: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Library: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`

**Rhythm**:
- Sections: `py-12 md:py-20 lg:py-24`
- Cards: `p-6 md:p-8`
- Component gaps: `gap-4` (tight), `gap-8` (distinct)

---

## Components

### Navigation
- **Landing Header**: Sticky blur backdrop, logo left, nav center, CTA right (desktop); hamburger (mobile)
- **App Tabs**: Bottom nav (mobile), sidebar (desktop); active state = brand fill

### Cards & Surfaces
- **Translation**: `rounded-2xl border shadow-sm` (light), subtle glow (dark)
- **Menu Items**: `rounded-xl hover:shadow-md`
- **Library**: Compact w/ thumbnail, metadata overlay, hover lift
- **Features**: Icon top-left, heading, description, gradient bg

### Buttons
- **Primary**: Brand fill, white text, `rounded-xl px-6 py-3 shadow-sm hover:shadow-md`
- **Secondary**: Transparent, brand border/text, `rounded-xl`
- **Ghost**: Transparent, `hover:bg-surface`
- **FAB**: Circular, gradient, `shadow-lg`, fixed bottom-right

### Forms
- **Inputs**: `rounded-lg border-2 focus:border-brand px-4 py-3`
- **Language Select**: Pills w/ flag emoji, active = brand bg
- **Dropdowns**: shadcn/ui, `rounded-lg`, scrollable

### Data Display
- **Translation Output**: Two-column (source|target), visual separator, distinct surface colors
- **Usage Meter**: Gradient progress bar, contextual color (green→yellow→red)
- **Chat Bubbles**: `rounded-2xl`, left (user/surface), right (translation/brand tint)
- **Tags**: `rounded-full` pills, border, `hover:bg-brand/10`

### Overlays
- **Paywall**: Centered `max-w-2xl rounded-3xl backdrop-blur-md`
- **Language Picker**: Bottom sheet (mobile), modal (desktop), search top
- **Camera**: Full-screen, viewfinder guides, capture button bottom-center

**Icons**: Lucide, 20px default, 24px (primary actions), 16px (metadata)

---

## Interactions

### Animations (minimal, purposeful)
- Page transitions: fade 150ms
- Button active: scale 0.98
- Card hover: translateY -2px, shadow increase, 200ms ease
- Modal entry: fade + scale from 0.95, 250ms
- **No scroll animations** - instant usability priority

### Microinteractions
- Checkmark on save
- Ripple on mic activation
- Language swap: 180° rotate
- Copy: toast bottom-center

---

## Page Layouts

### Landing Page

**Hero** (80vh): Full-width travel image (blur + gradient overlay), centered content (logo, Display headline, tagline, 2 CTAs), phone mockup offset-right (desktop)

**Features**: 3-col grid, icon (48px) + H2 + description + 3-4 micro-features, alternating bg tints

**How It Works**: Horizontal timeline (desktop), vertical (mobile), numbered circles + dotted line

**Social Proof**: 2-col (testimonial carousel | usage stats), large numbers + context

**Pricing**: 3-col plan comparison (Free, Pro, Lifetime), highlight Pro, FAQ accordion

**Footer**: 4-col grid (Product, Company, Legal, Language), newsletter signup, social icons

### App Shell

**Mobile**: Full viewport, bottom tabs (Camera, Chat, Library, Account), swipe-down user menu

**Desktop**: Left sidebar (240px) w/ logo, tabs, usage meter; main area w/ contextual header

### Camera Translation

**Capture**: Full camera feed, large bottom-center button, top bar (Close, Flash, Gallery), corner brackets

**Results**: Split (image top/left, text overlay) | Translation panel (languages, text @ Body Large, actions: Save/Copy/Speak/Re-translate) | **Menu Mode**: Allergen (red), Veg (green), Cultural Tip chips

### Travel Chat

Top: Language selector (source ⇄ swap ⇄ target) | Bubbles (user left/surface, translation right/brand tint, timestamps) | Bottom: text input, mic (pulse when active), send | Speak button per bubble

### Library

**Filter**: Scrollable chips (All, Images, Text, Chat, languages), search, filter drawer

**Grid**: Masonry (images tall, text compact), cards w/ thumbnail, badges, tags, timestamp, 3-dot menu

**Trips**: Folder cards (photo, name, dates, count), expandable

### Account/Settings

**Profile**: Avatar, name, email, tier badge, language prefs (home + 5 targets)

**Usage** (Free): 2 progress meters (images, chat), upgrade CTA at limits

**Billing** (Pro): Plan card, renewal, Stripe portal, export CSV

**Settings**: Theme, offline mode, speech prefs

---

## Images

**Essential Placements**:

1. **Landing Hero** (1920x1080): Outdoor café, menu boards, diverse travelers, sunlight. 20% blur + dark gradient overlay. Full-width, 80vh top

2. **Feature Illustrations** (600x400 each): Camera (phone photo of French menu), Chat (person + translated bubble), Library (grid + map pins). Above feature cards, `rounded-2xl shadow`

3. **App Mockup** (900x1800): iPhone frame, camera translation active. Hero offset-right (desktop), below CTAs (mobile)

4. **Trip Thumbnails** (400x300): Destination photos, `rounded-lg`, overlay w/ trip name

5. **Testimonials** (80x80): Circular traveler avatars

---

## Accessibility

- **Focus**: 2px brand ring w/ offset, visible both modes
- **ARIA**: All icon buttons, selectors, camera controls
- **Keyboard**: Full tab order, Esc closes modals, Enter submits
- **Contrast**: 4.5:1 body text, 3:1 large headings
- **Images**: next/image, blur placeholders, lazy load
- **Loading**: Skeletons (Library), spinners (translations), shimmers (images)

**Dark Mode**: Visible input borders (not shadow-only), reduced shadow intensity, test camera UI visibility

---

*Confident, travel-ready experience—inspiring yet highly functional.*