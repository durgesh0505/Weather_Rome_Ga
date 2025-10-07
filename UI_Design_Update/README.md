# UI_Design Neumorphic - Modular Design System

A comprehensive, modular neumorphic design system with support for both light and dark themes.

## Features

- ✨ Complete neumorphic styling with raised and inset effects
- 🎨 Light and dark theme support
- 📦 Comprehensive component library
- 🎯 Modular architecture for easy customization
- 📁 Organized file structure
- 🔄 Easy to extend and maintain

## Installation

### Option 1: Import Everything (Recommended)

Simply include the main CSS file in your HTML:

```html
<link rel="stylesheet" href="path/to/neumorphic-ui.css">
```

### Option 2: Import Specific Modules

Import only the modules you need:

```css
/* Core (Required) */
@import url('core/variables.css');
@import url('core/base.css');

/* Theme (Required) */
@import url('themes/dark/dark-theme.css');

/* Components (Pick what you need) */
@import url('components/buttons/buttons.css');
@import url('components/forms/forms.css');
@import url('components/cards/cards.css');
/* ... add more as needed */

/* Utilities (Optional) */
@import url('utils/utilities.css');
```

## File Structure

```
UI_Design_Update/
├── neumorphic-ui.css          # Main import file
├── README.md                  # Documentation
│
├── core/                      # Core system files
│   ├── variables.css          # CSS custom properties
│   └── base.css              # Base styles & resets
│
├── themes/                    # Theme variations
│   ├── dark/
│   │   └── dark-theme.css    # Dark theme overrides
│   ├── light/                # Ready for custom light themes
│   └── custom/               # Ready for custom themes
│
├── animations/                # Physics-based animations
│   ├── physics/
│   │   └── physics.css       # Spring animations & effects
│   ├── spring/               # Ready for spring animations
│   └── transitions/          # Ready for transitions
│
├── components/                # UI Components
│   ├── buttons/
│   │   └── buttons.css       # Button components
│   ├── forms/
│   │   └── forms.css         # Input, textarea, select
│   ├── controls/
│   │   └── controls.css      # Checkbox, radio, toggle, slider
│   ├── cards/
│   │   └── cards.css         # Card components
│   ├── feedback/
│   │   └── feedback.css      # Badges, alerts, spinner, tooltips
│   ├── navigation/
│   │   └── navigation.css    # Tabs, breadcrumbs, pagination
│   ├── data-display/
│   │   └── data-display.css  # Lists, tables, avatars, accordion, modal
│   └── layout/
│       └── layout.css        # Container, grid, flex utilities
│
└── utils/                     # Utility classes
    └── utilities.css          # Spacing, colors, text helpers

```

## Theme Switching

The design system automatically adapts to your browser/OS theme preference using `prefers-color-scheme`. You can also manually override the theme.

### Automatic Theme Detection (Default)

By default, the theme automatically matches your OS/browser settings:

```html
<!-- Automatically uses light or dark theme based on OS/browser preference -->
<body>
  <!-- Your content -->
</body>
```

### Manual Theme Override

You can manually set the theme using the `data-theme` attribute:

```html
<!-- Force dark theme regardless of OS settings -->
<body data-theme="dark">
  <!-- Your content -->
</body>
```

### JavaScript Theme Toggle

```javascript
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}
```

**Note**: The manual `data-theme` attribute takes precedence over OS/browser preferences, allowing users to override automatic detection.

## Component Usage

### Buttons

All buttons feature **physics-based spring animations** for natural, tactile interactions.

```html
<!-- Standard button with spring physics -->
<button class="btn">Click Me</button>

<!-- Primary button -->
<button class="btn btn-primary">Primary</button>

<!-- Success button -->
<button class="btn btn-success">Success</button>

<!-- Warning button -->
<button class="btn btn-warning">Warning</button>

<!-- Danger button -->
<button class="btn btn-danger">Danger</button>

<!-- Icon button with enhanced physics -->
<button class="icon-btn">❤️</button>

<!-- Button sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
```

**Physics Features:**
- **Spring bounce** on hover with subtle lift and scale
- **Compression effect** on press with energy feedback
- **Spring release** animation with natural overshoot
- **Icon buttons** have playful rotation on hover

### Forms

```html
<!-- Text input -->
<input type="text" class="input" placeholder="Enter text...">

<!-- Textarea -->
<textarea class="textarea" placeholder="Enter message..."></textarea>

<!-- Select dropdown -->
<select class="select">
    <option>Option 1</option>
    <option>Option 2</option>
</select>

<!-- Form group -->
<div class="form-group">
    <label class="form-label">Email</label>
    <input type="email" class="input" placeholder="user@example.com">
</div>
```

### Controls

```html
<!-- Checkbox -->
<div class="checkbox-wrapper">
    <div class="checkbox-container">
        <input type="checkbox" id="check1" class="checkbox" checked>
        <label for="check1" class="checkbox-label"></label>
    </div>
    <span>Accept terms</span>
</div>

<!-- Radio button -->
<div class="radio-wrapper">
    <div class="radio-container">
        <input type="radio" id="radio1" name="group" class="radio">
        <label for="radio1" class="radio-label"></label>
    </div>
    <span>Choice A</span>
</div>

<!-- Toggle switch -->
<div class="toggle-wrapper">
    <span>Enable notifications</span>
    <div class="toggle-container">
        <input type="checkbox" id="toggle1" class="toggle">
        <label for="toggle1" class="toggle-label"></label>
    </div>
</div>

<!-- Slider -->
<input type="range" class="slider" min="0" max="100" value="50">

<!-- Progress bar -->
<div class="progress">
    <div class="progress-fill" style="width: 65%"></div>
</div>
```

### Cards

```html
<div class="card">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
</div>

<!-- Card with sections -->
<div class="card">
    <div class="card-header">
        <h3>Header</h3>
    </div>
    <div class="card-body">
        <p>Body content</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-sm">Action</button>
    </div>
</div>
```

### Feedback Components

```html
<!-- Badges -->
<span class="badge">Default</span>
<span class="badge success">Success</span>
<span class="badge warning">Warning</span>
<span class="badge danger">Danger</span>

<!-- Alerts -->
<div class="alert info">ℹ️ Info message</div>
<div class="alert success">✅ Success message</div>
<div class="alert warning">⚠️ Warning message</div>
<div class="alert error">❌ Error message</div>

<!-- Loading spinner -->
<div class="spinner"></div>
<div class="spinner spinner-sm"></div>
<div class="spinner spinner-lg"></div>
```

### Navigation

```html
<!-- Tabs -->
<div class="tabs">
    <button class="tab active">Dashboard</button>
    <button class="tab">Profile</button>
    <button class="tab">Settings</button>
</div>

<!-- Breadcrumbs -->
<div class="breadcrumbs">
    <a href="#" class="breadcrumb-item">Home</a>
    <span class="breadcrumb-separator">/</span>
    <a href="#" class="breadcrumb-item">Products</a>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item active">Details</span>
</div>

<!-- Pagination -->
<div class="pagination">
    <button class="page-btn">←</button>
    <button class="page-btn active">1</button>
    <button class="page-btn">2</button>
    <button class="page-btn">3</button>
    <button class="page-btn">→</button>
</div>
```

### Data Display

```html
<!-- List -->
<ul class="list">
    <li class="list-item">First item</li>
    <li class="list-item active">Second item (active)</li>
    <li class="list-item">Third item</li>
</ul>

<!-- Table -->
<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Item 1</td>
            <td>Active</td>
        </tr>
    </tbody>
</table>

<!-- Avatars -->
<div class="avatar sm">JD</div>  <!-- Small -->
<div class="avatar">AS</div>      <!-- Medium -->
<div class="avatar lg">MK</div>   <!-- Large -->

<!-- Avatar with image -->
<div class="avatar">
    <img src="user.jpg" alt="User">
</div>

<!-- Accordion -->
<div class="accordion-item">
    <button class="accordion-header" onclick="toggleAccordion('acc1')">
        Section 1
        <span class="accordion-icon">▼</span>
    </button>
    <div class="accordion-content" id="acc1">
        Content goes here.
    </div>
</div>

<script>
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const header = content.previousElementSibling;

    content.classList.toggle('open');
    header.classList.toggle('open');
}
</script>
```

### Modal

```html
<!-- Trigger -->
<button class="btn" onclick="openModal()">Open Modal</button>

<!-- Modal -->
<div class="modal" id="myModal">
    <div class="modal-content">
        <div class="modal-header">
            <h3 class="modal-title">Modal Title</h3>
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <p>Modal content goes here.</p>
        </div>
        <div class="modal-footer">
            <button class="btn" onclick="closeModal()">Cancel</button>
            <button class="btn btn-primary">Confirm</button>
        </div>
    </div>
</div>

<script>
function openModal() {
    document.getElementById('myModal').classList.add('show');
}

function closeModal() {
    document.getElementById('myModal').classList.remove('show');
}

// Close when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
});
</script>
```

### Layout

```html
<!-- Container -->
<div class="container">
    <!-- Your content -->
</div>

<!-- Grid layout -->
<div class="grid grid-cols-3 gap-4">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
</div>

<!-- Flex layout -->
<div class="flex items-center justify-between gap-3">
    <div>Left</div>
    <div>Right</div>
</div>
```

## Physics-Based Animations

The design system includes natural, spring-based animations for enhanced user experience.

### Spring Animation Classes

```html
<!-- Gentle spring - smooth, natural movement -->
<button class="btn spring-gentle">Gentle</button>

<!-- Bouncy spring - playful overshoot effect -->
<button class="btn spring-bounce">Bouncy</button>

<!-- Snappy spring - quick, responsive movement -->
<button class="btn spring-snappy">Snappy</button>

<!-- Exit spring - quick departure -->
<button class="btn spring-exit">Exit</button>
```

### Physics Effects

```html
<!-- Lift effect - rises on hover -->
<div class="card physics-lift">Lift Me</div>

<!-- Float effect - continuous floating -->
<div class="card physics-float">Float</div>

<!-- Pulse effect - breathing animation -->
<div class="badge physics-pulse">Pulse</div>

<!-- Wobble effect - playful shake on hover -->
<button class="btn physics-wobble">Wobble</button>

<!-- Momentum - natural physics response -->
<button class="btn physics-momentum">Momentum</button>

<!-- Elastic - rubber-band physics on hover -->
<div class="card physics-elastic">Elastic</div>

<!-- Ripple - water-like interaction feedback -->
<button class="btn physics-ripple">Ripple</button>

<!-- Energy burst - particle-like feedback on click -->
<button class="btn physics-burst">Burst</button>
```

### Animation Variables

```css
/* Spring physics curves */
--spring-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--spring-snappy: cubic-bezier(0.175, 0.885, 0.32, 1.4);
--spring-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--spring-exit: cubic-bezier(0.4, 0, 1, 1);

/* Animation durations */
--anim-instant: 0.08s;
--anim-fast: 0.2s;
--anim-normal: 0.3s;
--anim-slow: 0.5s;
--anim-extra-slow: 0.8s;
```

### Animation Controls

```html
<!-- Pause animation -->
<div class="physics-float physics-paused">Paused</div>

<!-- Delayed start -->
<div class="physics-pulse physics-delayed">Delayed</div>

<!-- Fast animation -->
<div class="physics-float physics-fast">Fast</div>

<!-- Slow animation -->
<div class="physics-pulse physics-slow">Slow</div>
```

### Performance Optimization

```html
<!-- GPU acceleration for smooth animations -->
<div class="card physics-accelerated physics-float">
    Optimized Animation
</div>
```

**Note**: The design system respects `prefers-reduced-motion` for accessibility. Animations are automatically disabled for users who prefer reduced motion.

## CSS Custom Properties

All design tokens are defined as CSS custom properties in `core/variables.css`:

```css
/* Colors */
--neu-base: #e0e5ec;
--neu-dark: rgba(163, 177, 198, 0.6);
--neu-light: rgba(255, 255, 255, 0.9);
--neu-accent: #4a9eff;
--neu-success: #26d07c;
--neu-warning: #f5a623;
--neu-danger: #f56565;
--neu-text: rgba(0, 0, 0, 0.87);
--neu-text-dim: rgba(0, 0, 0, 0.6);

/* Shadow properties */
--neu-distance: 8px;
--neu-blur: 16px;

/* Transitions */
--neu-transition-fast: 0.2s ease;
--neu-transition-normal: 0.3s ease;
--neu-transition-slow: 0.4s ease;

/* Border radius */
--neu-radius-sm: 8px;
--neu-radius-md: 12px;
--neu-radius-lg: 16px;
--neu-radius-xl: 24px;
--neu-radius-full: 9999px;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-2xl: 3rem;
```

## Customization

### Override Variables

Create your own custom theme by overriding CSS variables:

```css
:root {
    --neu-accent: #ff6b6b;  /* Change accent color */
    --neu-distance: 10px;   /* Increase shadow distance */
    --neu-blur: 20px;       /* Increase shadow blur */
    --neu-radius-md: 8px;   /* Adjust border radius */
}
```

### Create Custom Theme

Create a new theme file in `themes/`:

```css
/* themes/custom/custom-theme.css */
[data-theme="custom"] {
    --neu-base: #1a1a1a;
    --neu-accent: #00d4ff;
    /* ... other variables */
}
```

Then import it:

```css
@import url('themes/custom/custom-theme.css');
```

## Utility Classes

The design system includes comprehensive utility classes in `utils/utilities.css`:

- **Spacing**: `m-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`, `p-*`, `pt-*`, etc.
- **Text**: `text-left`, `text-center`, `text-lg`, `font-bold`, etc.
- **Colors**: `text-accent`, `text-success`, `text-warning`, etc.
- **Display**: `block`, `inline-block`, `hidden`, `flex`, etc.
- **Width/Height**: `w-full`, `h-full`, `w-1-2`, etc.
- **Flexbox**: `flex`, `items-center`, `justify-between`, etc.
- **Shadows**: `shadow-neu`, `shadow-neu-inset`
- **Transitions**: `transition-fast`, `transition-normal`, etc.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Best Practices

1. **Modular Imports**: Only import the modules you actually use
2. **CSS Variables**: Use CSS variables for consistent theming
3. **Utility Classes**: Combine utility classes for quick prototyping
4. **Accessibility**: Always include proper ARIA labels and semantic HTML
5. **Performance**: Minimize the number of CSS imports in production

## License

Free to use for personal and commercial projects.
