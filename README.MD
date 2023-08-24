# To Do

## Main Website

### High Priority

- Fix/Finish styling
- Fully phase out .PNG and .JPG/.JPEG (possibly even .GIF) (convert to .WEBP)
- Switch to native image files
- Change music.html's text boxes to reflect what I like about them instead of a full Wikipedia copy-paste
- Complete scrollbar customization
- Redo CSS and organize/optimize IDs/Classes
- 

### Medium Priority

- Implement compatibility for mobile devices and Other aspect ratios/sizes.
- Switch from JQuery to DOM, avoiding the import of JQuery library, effectively speeding up load times.
- Implement unique CSS animations/interactivity to almost all elements while maintaining speed.
- Phase out alert() and use Modals or custom DOM elements.

### Low Priority

- Switch to a custom font
- Finish implementing the dark/light mode

### Lowest Priority

- Finish Login/Sign-Up Functionality

## Projects

### High Priority

- Fully revamp the "bouncing box" with a Minecraft-themed, multi-level game.
- Fully recreate the assets of all projects (i.e., Platformer & Box) (Including Halle).
- Fix Project Spark's JS for all projects and phase out JQuery, effectively speeding up all projects tenfold.
- Finish Villager Clicker... Originally, "Bouncing Box".
  a) {What an uninspired name, well I mean, so is mine, but at least there's a theme}.

### Medium Priority

- Fix "Catstagram" Functionality/CSS, _IF_ I even decide to keep it.

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
  postition: fixed;
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
