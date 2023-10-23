$(document).ready(() => {
  const FRAME_RATE = 120,interval = setInterval(newFrame,1e3 / FRAME_RATE);

  $(document).on('eventType',handleEvent);

  function newFrame() {}

  function handleEvent(event) {}


  function endGame() {
	 clearInterval(interval);

	 $(document).off();
  }
});