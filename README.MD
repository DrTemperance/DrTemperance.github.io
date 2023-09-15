# To Do

## Main Website

### TIME => ARG

### High Priority

- Fix & Finish css; incl. class/id names & inline **_(73% Done)_**
- _Music.html_
- Implement speed based blur filter and boolean values for CSS, Difficulty(speed) in a settings menu. _-Villager_
- Integrate PHP & Python, maybe even Java Webapps

### Medium Priority

- Compatibility for varying aspect ratios.
- CSS interactivity to elements while maintaining performance.
- Switch to _Modals_ from hidden divs.

### Low Priority

- Switch to a custom font
- Finish implementing the dark/light mode

### Lowest Priority

- Finish Login/Sign-Up Functionality

## Projects

### High Priority

- Fully revamp the "bouncing box" with a Minecraft-themed, multi-level game.
- Fully recreate the assets of all projects (i.e., Platformer & Box) (Including Halle).
- Fix Project Spark's JS for all projects and phase out JQuery, speeding up all projects tenfold.
- Finish Villager Clicker... Originally, "Bouncing Box".
  a) {What an uninspired name, well I mean, so is mine, but at least there's a theme}.

## Time Machine

### High Priority

- Finish writing the stories
- Finish functionality
- Finish implementing the universal images

### Medium Priority

- Implement compatibility for both Mobile Devices & Non-code users
- Implement an input scrubber to prevent the use of JS or HTML from the console

## bbudu

For project boxes:

```css
.clickedbox {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 50vw;
  height: 50vh;
}
```

```js
document.querySelectorAll(".projclassthing").forEach((i) => {
    i.addEventListener("click", (handle) => {
        i.classlist.add("cclicky");
    });
});
```