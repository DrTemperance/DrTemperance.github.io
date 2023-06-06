$(function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);
  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      setInterval(main, 1000 / frameRate);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createPlatform(-50, -50, canvas.width + 100, 50);
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200);
    createPlatform(-50, -50, 50, canvas.height + 500);
    createPlatform(canvas.width, -50, 50, canvas.height + 100);
  }
  registerSetup(setup);
});