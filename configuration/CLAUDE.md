# Code Generation Preferences for Code Clicker

## Frontend Dependencies
- **CSS Framework**: Bootstrap 5
  - CDN: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`
  - JS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js`
  
- **Icons**: Bootstrap Icons
  - CDN: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css`

## Style Guides to Follow
- [Google Style Guide - HTML](https://google.github.io/styleguide/htmlcssguide.html)
- [Google Style Guide - CSS](https://google.github.io/styleguide/htmlcssguide.html)
- [Google Style Guide - JavaScript](https://google.github.io/styleguide/jsguide.html)

## JavaScript Preferences
- **NO modules**: Use vanilla JavaScript only
- **Global namespace**: Code in `main.js` should use global scope or IIFE pattern
- **No import/export statements**
- **No require() statements**
- **Browser compatibility**: Target modern browsers (ES6+)

## HTML Preferences
- Use semantic HTML elements
- Bootstrap 5 classes for layout and components
- Proper indentation and formatting per Google Style Guide
- Link all CSS and JS files properly

## CSS Preferences
- Style for final.css should go in `assets/css/final.css`, otherwise all custom CSS in `assets/css/style.css`
- Follow BEM or similar naming convention for custom classes
- Leverage Bootstrap utilities where possible
- Keep specificity low

## File Organization
- Don't create new files unless absolutely necessary
- Keep JavaScript in separate `.js` files in `assets/js/`
- Keep all CSS withing `final.css` and `style.css`
- HTML files should remain in `pages/` directory

## Code Style Requirements
- **NO inline styling** - never use `style` attribute on HTML elements
- **NO internal styling** - never use `<style>` tags in HTML files
- **NO inline scripting** - never use `onclick`, `onload`, etc. attributes
- **NO internal scripting** - never use `<script>` tags in HTML files
- All JavaScript goes to separate files in `assets/js/`