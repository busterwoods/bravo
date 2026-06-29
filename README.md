# Code Clicker
> Click Your Way to Coding Mastery!

## Authorship
- Troy Woods, [Github Profile](https://github.com/busterwoods), 06/24/2026, Version 0.2

## User Story 
- **as a** Bored individual viewing this repository 
- **i want** A fun game that I can play without requiring my full attention
- **so that** I can do something fun while I work on something else

## Narrative
Start as a simple coding student, and type your way up to a level of programming never before seen. Increase your productivity with each algorithm you learn and each language you master. Spread your knowledge to Stack Overflow to gain Reputation which can be spent on large upgrades. Can you become the best programmer in the world?

## About App
### Links:
- [Issue/Game Idea](https://github.com/busterwoods/bravo/issues/1)
- [Wireframe](https://github.com/busterwoods/bravo/wiki/Wireframe)
### Tree:
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
│   ├───img
│   │       wireframe.png
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
### Tech Stack
- VSCode: Live Server, TODO
- CSS: Normalize, BS5, BS5 Icons (via CDN)
- JavaScript: JQuery, code kept in external `.js` files 
- Git/Github: Repo, README/Makrdown, wiki, issues, Pages

### Code Snippet
This button click:
```
<div class="final-hero__button-wrap d-flex justify-content-center mb-4">
  <button type="button" id="bigButton" class="btn big-button" aria-label="Main click button">
    <span class="big-button__icon">&lt;/&gt;</span>
  </button>
</div>
```
Activates this code:
```
$('#bigButton').on('click', () => {
    clicks += (clickAdditive * clickMultiplier) ** (clicksExponentAll * clicksExponentMan);
    totalClicks += (clickAdditive * clickMultiplier) ** (clicksExponentAll * clicksExponentMan);
    updateScore();
    updateUpgradeAvailability();
    updateAchievements();
  });
```
To increase the user's score

### validation & accessibilty
