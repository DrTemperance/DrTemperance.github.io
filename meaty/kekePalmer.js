var charSet, Protagonist, fetchURL, antagonistName;

function initializeDecade(decade) {
  const MainAntagonist = {
    charID: -1,
    alive: true,
    name: "",
  };
  const Protagonist = {
    charID: 0,
    alive: true,
    name: "",
  };

  function establishChars() {
    if (decade === "1980s") {
      //TODO const jsonChars = JSON CHARSET;
      for (let i = 1; i < jsonChars.length; i++) {
        // Perform some operation on jsonChars[i] //
      }
    }
  }

  const fetchURLs = {
    "1980s": "images/stories!/80s/jsons/configurer.json",
    "1990s": "images/stories!/90s/jsons/configurer.json",
    "2000s": "images/stories!/2000s/jsons/configurer.json",
  };

  if (decade in fetchURLs) {
    antagonistName = decade === "1980s" ? "Roxanne" : "1990s" ? "inkjet" : "2000s" ? "inkjet" : null;
    fetchURL = fetchURLs[decade];
  }

  if (fetchURL) {
    (async () => {
      try {
        const response = await fetch(fetchURL);
        if (response.ok) {
          const data = await response.json();
          charSet = data;
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
