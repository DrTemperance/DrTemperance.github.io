$(document).ready(() => {
  // Constant Variables
  // one-time setup
  const FRAME_RATE                 = 120,
        FRAMES_PER_SECOND_INTERVAL = 1e3 / FRAME_RATE,
        interval                   = setInterval(newFrame,FRAMES_PER_SECOND_INTERVAL);

  $(document).on('eventType',handleEvent);

  function newFrame() {}

  function handleEvent(event) {}


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
});