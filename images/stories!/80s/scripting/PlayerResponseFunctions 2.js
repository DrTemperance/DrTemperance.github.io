function playerScriptsHandler(lowerInput) {
  if (lowerInput.includes("go")) {
    var index = lowerInput.indexOf(" to");
    if (index != -1) {
      var functionName = lowerInput.substring(0, index);
      var argument = lowerInput.substring(index + 4).replace(/ /g, "");
      return `${functionName}('${argument}')`;
    } else {
      return `${lowerInput}`;
    }
  } else if (lowerInput.includes("inspect")) {
    var index = lowerInput.indexOf(" ");
    if (index != -1) {
      var functionName = lowerInput.substring(0, index);
      var argument = lowerInput.substring(index).replace(/ /g, "");
      return `${functionName}(${argument})`;
    } else {
      return `${lowerInput}`;
    }
  } else if (lowerInput.includes("enter")) {
    var index = lowerInput.indexOf(" ");
    if (index != -1) {
      var functionName = lowerInput.substring(0, index);
      var argument = lowerInput.substring(index).replace(/ /g, "");
      return `${functionName}(${argument})`;
    } else {
      return `${lowerInput}`;
    }
  } else {
    return `${lowerInput}`;
  }
}
