function playerScriptsHandler(lowerInput) {
   let index, argument, functionName;
   switch (true) {
      case lowerInput.includes('go'):
         index = lowerInput.indexOf(' to');
         if (index === -1) {
            return `${lowerInput}`;
         } else {
            functionName = lowerInput.substring(0, index);
            argument = lowerInput.substring(index + 4).replace(/ /g, '');
            return `${functionName}('${argument}')`;
         }
         break;
      case lowerInput.includes('inspect') || lowerInput.includes('enter'):
         index = lowerInput.indexOf(' ');
         if (index === -1) {
            return `${lowerInput}`;
         } else {
            functionName = lowerInput.substring(0, index);
            argument = lowerInput.substring(index).replace(/ /g, '');
            return `${functionName}(${argument})`;
         }
         break;
      default:
         return `${lowerInput}`;
   }
}
