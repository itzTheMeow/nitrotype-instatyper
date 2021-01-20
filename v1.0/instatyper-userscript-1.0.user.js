// ==UserScript==
// @name         NitroType InstaTyper
// @namespace    https://github.com/itzTheMeow/nitrotype-instatyper
// @version      1.0
// @description  An instant typer for NitroType.
// @author       Meow
// @match        https://*.nitrotype.com/race
// @match        https://*.nitrotype.com/profile
// ==/UserScript==

(function () {
  console.log("Loading InstaTyper...");
  if (window.location.href.includes("/race")) {
    let loop = setInterval(function () {
      let texts = document.querySelectorAll(".dash-letter"); // Gets all the letters to be typed.
      if (!texts) return; // Stops if theres no letters.
      if (document.querySelector(".dashShield")) return console.log("Still Starting..."); // Stops if the race hasnt started yet.
      clearInterval(loop); // Stops this loop so it doesnt keep opening windows.

      let titleText = "";
      texts.forEach((t) => {
        titleText += t.innerText; // Add each letter to the text to be typed.
      });
      titleText = titleText.replace(/ /g, " "); // Replaces all the Non Breaking Spaces they use with regular spaces.

      let keyDelay = 0; // W.I.P. keypress delay setting.

      let sent = window.open("", "", "height=1,width=1"); // Creates a popup window.
      sent.document.title = `${titleText}$NT${keyDelay}$NT`; // Sets the title in a format readable by the AHK script.
    });
  } else if (window.location.href.includes("/profile")) {


  }
})();
