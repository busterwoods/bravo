# Code Clicker - Agent Configuration

## Technology Stack
- **Frontend Framework**: Bootstrap 5 (BS5)
- **Icons**: Bootstrap Icons
- **JavaScript**: JQuery and DOM 
- **Module System**: No JS Modules (vanilla JavaScript only)

## Code Generation Preferences
All code generation and recommendations should adhere to:
- **HTML Style Guide**: Google Style Guide for HTML
- **CSS Style Guide**: Google Style Guide for CSS
- **JavaScript Style Guide**: Google Style Guide for JavaScript

## Project Structure
```
.
│   index.html
│   README.md
│   
├───assets
│   ├───css
│   │       final.css
│   │       style.css
│   │       
│   └───js
│           concept.js
│           final.js
│           main.js
│           win.js
│           
├───configuration
│       AGENTS.md
│       CLAUDE.md
│       
└───pages
        concept.html
        final.html
        win.html
```

## Guidelines
1. All CSS for file final.html should be written in `assets/css/final.css` using Google Style Guide conventions
2. All JavaScript should be in separate `.js` files in `assets/js/` - keep as vanilla JS (no modules)
3. HTML should follow Google Style Guide with Bootstrap 5 classes for layout and components
4. Use Bootstrap Icons for icon needs - link from CDN or local package
5. Maintain consistency across all HTML files in the `pages/` directory
6. **NO inline styling or scripting** - no `style` attributes on HTML elements
7. **NO internal styling or scripting** - no `<style>` or `<script>` tags in HTML files