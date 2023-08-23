function handleKeyDownEvent(event) {
    const forbiddenKeyCodes = new Set(["F12"]);
    if ((event.ctrlKey && event.shiftKey && event.key === "i") || forbiddenKeyCodes.has(event.key)) {
        event.preventDefault();
    }
}

document.addEventListener("keydown", handleKeyDownEvent, false);
document.oncontextmenu = e => e.preventDefault();
