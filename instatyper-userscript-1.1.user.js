// ==UserScript==
// @name         NitroType InstaTyper
// @namespace    https://github.com/itzTheMeow/nitrotype-instatyper
// @version      1.1
// @description  An instant typer for NitroType.
// @author       Meow
// @match        https://*.nitrotype.com/race/*
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

      let titleText = ""; // Create empty title text.
      texts.forEach((t) => {
        titleText += t.innerText; // Add each letter to the text to be typed.
      });
      titleText = titleText.replace(/ /g, " "); // Replaces all the Non Breaking Spaces they use with regular spaces.

      let setting = JSON.parse(localStorage.getItem("instatyper_settings") || "{}").keyDelay; // Gets the setting.
      let keyDelay = setting == 0 ? 0 : setting || 10; // Gets the key press delay.

      let sent = window.open("", "", "height=1,width=1"); // Creates a popup window.
      sent.document.title = `${titleText}$NT${keyDelay}$NT`; // Sets the title in a format readable by the AHK script.
    });
  } else if (window.location.href.includes("/profile")) {
    let testFor = setInterval(function () {
      let refButton;
      let allButtons = document.querySelectorAll(".has-btn .btn.btn--fw"); // Get all of the buttons in the block.

      allButtons.forEach((b) => {
        if (b.innerText == "Online Status") refButton = b; // Only get the "Online Status" button.
      });
      if (!refButton) return console.log("Still Loading..."); // Stop if there's no button. (page is loading)
      clearInterval(testFor); // Stop the testing loop.

      let settingsButton = document.createElement("div"); // Create replica button.
      settingsButton.id = "-meow-instatyper-settings";
      settingsButton.className = "btn btn--fw";
      settingsButton.innerHTML = `<svg class="icon icon-smiley btn-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/dist/site/images/icons/icons.css.svg#icon-smiley"></use></svg>InstaTyper Settings`;

      settingsButton.onclick = function () {
        settingsButton.classList.add("is-active"); // Make the button blue when clicked.
        allButtons.forEach((b) => {
          b.classList.remove("is-active"); // Make the other buttons grey again.
        });
        let section = settingsButton.parentElement.parentElement.nextElementSibling; // Get the block that the settings are in.
        section.style.display = "none"; // Hide the settings block.
        let newSection =
          document.getElementById("-meow-instatyper-settings-section") ||
          document.createElement("div"); // Get/Create a new section for the settings. (to avoid crashing the site)
        newSection.className = "g-b g-b--9of12";
        newSection.id = "-meow-instatyper-settings-section";
        newSection.innerHTML = "";
        newSection.style.display = "";

        let title = document.createElement("h2"); // Create a clone title.
        title.className = "tbs";
        title.innerHTML = "InstaTyper Settings";
        newSection.appendChild(title);

        let desc = document.createElement("p"); // Create a clone body text.
        desc.className = "tc-ts";
        desc.innerHTML = "Change the settings of the InstaTyper!";
        newSection.appendChild(desc);

        let hole1 = document.createElement("div"); // Down the rabbit hole of elements.
        hole1.className = "g well well--b";
        let hole2 = document.createElement("div");
        hole2.className = "g-b g-b--7of12";
        let hole3 = document.createElement("div");
        hole3.className = "input";

        let sectionLabel = document.createElement("label"); // Create a label for the input.
        sectionLabel.className = "input-label";
        sectionLabel.innerHTML = "Delay Between Key Presses";
        hole3.appendChild(sectionLabel);

        let sectionInputStyle = document.createElement("style"); // Create some CSS to hide the number up/down arrows.
        sectionInputStyle.innerHTML = `#-meow-instatyper-settings-delay::-webkit-outer-spin-button,#-meow-instatyper-settings-delay::-webkit-inner-spin-button{-webkit-appearance: none;margin: 0;}`;
        document.head.appendChild(sectionInputStyle);

        let sectionInput = document.createElement("input"); // Create an input box for the number.
        sectionInput.type = "text";
        sectionInput.className = "input-field";
        sectionInput.id = "-meow-instatyper-settings-delay";
        let setting = JSON.parse(localStorage.getItem("instatyper_settings") || "{}").keyDelay; // Gets the setting.
        sectionInput.value = setting == 0 ? 0 : setting || 10; // Sets the value of the input to the saved key delay.
        sectionInput.placeholder = "0";
        sectionInput.style["-moz-appearance"] = "textfield"; // Hides the up/down arrows on firefox.
        sectionInput.onkeyup = function () {
          let num = Number(sectionInput.value) || ""; // Gets a number value from the input.
          if (sectionInput.value == "-" || sectionInput.value == "0") return; // Stops if you are typing "-1" or if the value is 0.

          if (num < -2) num = -1;
          if (num > 5000) num = 5000;
          if (String(num).includes(".")) num = Math.floor(num); // Rounds down decimals.
          if (String(num).includes("e")) num.value = 0; // Disables things like "1e4".
          sectionInput.value = num; // Sets the input to the new number.

          let settings = JSON.parse(localStorage.getItem("instatyper_settings") || "{}"); // Get the old settings.
          settings.keyDelay = num == 0 ? 0 : num || 10; // Set the new key delay.
          localStorage.setItem("instatyper_settings", JSON.stringify(settings)); // Save the new settings.
        };
        hole3.appendChild(sectionInput);

        hole2.appendChild(hole3); // Back out of the rabbit hole...
        hole1.appendChild(hole2);

        let hole12 = document.createElement("div"); // ...and into another one.
        hole12.className = "g-b g-b--5of12";
        let hole13 = document.createElement("ul");
        hole13.className = "list list--xxs ptm";

        let line1 = document.createElement("li"); // Create the first line of description text.
        line1.className = "list-item";
        line1.innerHTML = `<div class="tsxs tsi tc-ts"><b>Units:</b> ms <b>Min:</b> -1 <b>Max:</b> 5000</div>`;
        hole13.appendChild(line1);
        let line2 = document.createElement("li"); // Create the second line of description text.
        line2.className = "list-item";
        line2.innerHTML = `<div class="tsxs tsi tc-ts">Use <b>-1</b> for no delay, <b>0</b> for minimal delay.</div>`;
        hole13.appendChild(line2);
        let line3 = document.createElement("li"); // Create the third line of description text.
        line3.className = "list-item";
        line3.innerHTML = `<div class="tsxs tsi tc-ts"><b>0ms</b> is 1,000+WPM, <b>10ms</b> is around 500WPM, <b>55ms</b> is around 155WPM, <b>70ms</b> is around 135WPM, and <b>100ms</b> is around 100WPM.</div>`;
        hole13.appendChild(line3);

        hole12.appendChild(hole13); // And finally out!
        hole1.appendChild(hole12);

        newSection.appendChild(hole1); // Add everything to the new section.

        section.parentElement.appendChild(newSection); // Add the section to the page
      };

      refButton.parentElement.insertBefore(settingsButton, refButton.nextElementSibling); // Add the new button to the page.

      allButtons.forEach((b) => {
        b.onclick = function () {
          settingsButton.classList.remove("is-active"); // Make the button grey again.
          settingsButton.parentElement.parentElement.nextElementSibling.style.display = ""; // Shows the other settings box.
          document.getElementById("-meow-instatyper-settings-section").style.display = "none"; // Hides this settings box.
        };
      });
    });
  }
})();
