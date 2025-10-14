# WanderLingo Design Guidelines

## Design Foundation

**Approach**: Reference-Based (Canva's bright clarity + Airbnb's travel warmth)  
**Principles**: Clean minimalism, instant usability, soft visual comfort, mobile-first

---

## Color System

### Light Mode (Primary)
- **Primary**: `0 0% 96.08%` (soft white) | Hover: `0 0% 92%`
- **Secondary**: `0 0% 92.16%` (light gray)
- **Accent**: `9 75% 61%` (coral accent for CTAs/highlights)
- **Background**: `45 25% 97%` (warm off-white)
- **Surface**: `300 4.35% 96%` (card backgrounds)
- **Text Primary**: `0 0% 5.1%` (near black)
- **Text Secondary**: `0 0% 67.06%` (medium gray)
- **Border**: `0 0% 16.86%` (subtle but visible)
- **Muted**: `0 0% 25.1%`
- **Success**: `147 78% 42%` | **Warning**: `42 93% 56%` | **Error**: `356 91% 54%`

### Dark Mode
- **Background**: `20 14% 4%`
- **Surface/Card**: `20 14% 8%`
- **Primary**: `9 75% 61%`
- **Text**: `45 25% 91%` (primary), `45 15% 46%` (secondary)
- **Border**: `20 14% 15%`
- **Accent**: `25 45% 20%`

### Shadows (Canva-style subtle)
- **xs**: `0px 2px 0px 0px hsl(9 75% 61% / 0)`
- **sm**: `0px 1px 2px -1px hsl(9 75% 61% / 0)`
- **md**: `0px 2px 4px -1px rgba(0,0,0,0.06)`
- **lg**: `0px 4px 6px -1px rgba(0,0,0,0.08)`

---

## Typography

**Fonts**: Inter (all contexts), JetBrains Mono (code/technical only)

**Scale** (Canva-inspired soft hierarchy):
- Display: `text-5xl md:text-6xl` (48-60px), font-semibold
- H1: `text-4xl md:text-5xl` (36-48px), font-semibold  
- H2: `text-2xl md:text-3xl` (24-36px), font-medium
- H3: `text-xl md:text-2xl` (20-28px), font-medium
- Body Large: `text-lg` (18px) - translations, feature text
- Body: `text-base` (16px), font-normal
- Small: `text-sm` (14px) - metadata, labels
- Micro: `text-xs` (12px), font-medium - badges, tags

---

## Layout & Spacing

**Spacing Units**: `0.25rem` base - use multiples of 2, 4, 6, 8, 12, 16, 20, 24

**Containers**:
- Landing hero: Full-width with `max-w-7xl` content
- App shell: `max-w-6xl`  
- Camera/translation: `max-w-4xl`
- Library grid: `max-w-7xl`

**Corner Radius**: `0.4rem` base
- Cards/surfaces: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Inputs: `rounded-lg` (8px)
- Pills/tags: `rounded-full`

**Vertical Rhythm**:
- Landing sections: `py-16 md:py-24 lg:py-32`
- Card padding: `p-8`
- Component spacing: `gap-6` (related), `gap-12` (sections)

---

## Components

### Navigation
- **Landing Header**: White background `bg-white/80 backdrop-blur-md`, minimal shadow, logo left, clean nav center, coral CTA right; sticky top
- **App Tabs** (mobile): Bottom nav with soft shadows, icons 24px, active state = coral fill
- **Sidebar** (desktop): 240px, white background, coral accent on active

### Cards & Surfaces  
- **Base Card**: `bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow`
- **Translation Result**: Soft gray background `bg-gray-50`, rounded corners, generous padding
- **Feature Cards**: White cards, icon (coral), heading, description, subtle hover lift
- **Library Items**: Thumbnail left, metadata right, rounded-xl, border, compact `p-4`

### Buttons (Canva-style soft)
- **Primary (Coral CTA)**: `bg-[hsl(9,75%,61%)] text-white rounded-xl px-8 py-3 font-medium hover:bg-[hsl(9,75%,55%)] shadow-sm`
- **Secondary**: `bg-gray-100 text-gray-900 rounded-xl px-8 py-3 hover:bg-gray-200`
- **Outline**: `bg-white/90 backdrop-blur border-2 border-white text-white rounded-xl px-8 py-3` (for hero images)
- **Ghost**: `text-gray-700 hover:bg-gray-100 rounded-lg`
- **FAB**: Coral, circular, `shadow-lg`, bottom-right fixed

### Forms & Inputs
- **Text Input**: `bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-coral focus:ring-2 focus:ring-coral/20`
- **Language Pills**: Rounded-full, flag emoji, active = coral background
- **Dropdowns**: Clean white, subtle shadow, scrollable

### Data Display
- **Translation Panel**: Two-column (source | target), soft divider, distinct backgrounds (white | gray-50)
- **Progress Bars**: Soft gradient (green→coral), rounded-full, percentage overlay
- **Chat Bubbles**: User (white, left) | Translation (coral tint, right), `rounded-2xl`, timestamps below
- **Stats/Metrics**: Large numbers (coral), context text below, icon top-left

### Overlays
- **Modals**: `max-w-2xl bg-white rounded-3xl p-8 shadow-2xl`
- **Bottom Sheets** (mobile): Rounded top corners, handle indicator, white background
- **Paywall**: Centered, blurred backdrop, feature list with checkmarks

**Icons**: Lucide React, 20px default, 24px actions, coral for primary/active states

---

## Page Structures

### Landing Page

**Hero** (full-width, `h-[600px] md:h-[700px]`):  
- Travel scene image (bright, inviting), 30% blur + light gradient overlay
- Centered content: Display headline, subtitle, dual CTAs (coral primary + outline secondary)
- iPhone mockup floating right (desktop only)

**Features** (`py-24`):  
3-column grid (1 col mobile), white cards, coral icons (48px), H2 titles, body text, micro-features list

**How It Works** (`py-20`):  
Horizontal numbered timeline (desktop), soft connecting line, step cards with illustrations

**Social Proof** (`py-24 bg-gray-50`):  
2-column: Testimonial carousel (left, white cards) | Usage stats (right, large coral numbers)

**Pricing** (`py-24`):  
3-column plan cards, highlight Pro (coral border, shadow-lg), feature checkmarks, coral CTA

**Footer** (`py-16 bg-white border-t`):  
4-column grid (Product, Support, Company, Social), newsletter input with coral send button

### App Shell

**Mobile**: Full viewport, clean bottom tabs (white background, coral active), top header with back/menu
**Desktop**: Left sidebar (white, coral accents), main area with contextual toolbar

### Camera Translation
- Full camera feed with soft corner brackets
- Large circular capture button (coral), bottom-center
- Results: Image thumbnail + translation panel (white card, generous padding)
- Menu allergen tags: Red badges, clear icons

### Travel Chat
- Language selector top (soft pill design, swap icon)
- Message bubbles: User (white) | AI (coral-tinted), rounded-2xl
- Input bar: Clean white, mic button (coral when active), send arrow

### Library
- Filter chips (scrollable, rounded-full, active = coral)
- Masonry grid: Cards with thumbnails, metadata overlays, 3-dot menu
- Trip folders: Photo cards, name, dates, item count badge

### Account/Settings  
- Profile card: Avatar, tier badge (coral), language preferences
- Usage meters: Soft progress bars with contextual colors
- Settings list: Clean rows, toggle switches (coral), section dividers

---

## Images

**Essential Placements**:

1. **Landing Hero** (1920×1080): Bright outdoor café scene, colorful menus, travelers, natural light. 30% blur + soft gradient. Full-width top.

2. **Feature Illustrations** (600×400): Camera (phone scanning menu), Chat (translation bubble), Library (grid view). Above feature cards, rounded corners.

3. **App Mockup** (900×1800): iPhone showing translation, floating right side of hero (desktop only).

4. **Testimonial Avatars** (80×80): Circular, bright backgrounds, traveler photos.

5. **Trip Thumbnails** (400×300): Destination imagery, rounded-lg, subtle overlay.

---

## Interactions (Minimal Canva-style)

- **Transitions**: Fade 150ms, no scroll animations
- **Hover**: Cards lift 2px with shadow increase, buttons scale 0.98 on active
- **Focus**: 2px coral ring with offset, visible both modes  
- **Loading**: Subtle skeleton loaders (gray-200), spinners (coral)
- **Microinteractions**: Checkmark saves, mic pulse (coral), toast notifications (bottom-center)

---

## Accessibility

- **Contrast**: 4.5:1 text, 3:1 large headings, visible borders in dark mode
- **Keyboard**: Full navigation, Esc closes, Enter submits, focus visible
- **ARIA**: Labels on icons, status on meters, live regions for translations
- **Images**: Lazy load, blur placeholders, alt text required

---

*Clean, bright, instantly usable—Canva meets global travel.*