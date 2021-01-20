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
    let testFor = setInterval(function () {
      let refButton;
      let allButtons = document.querySelectorAll(".btn.btn--fw");

      allButtons.forEach((b) => {
        if (b.innerText == "Online Status") refButton = b;
      });
      if (!refButton) return console.log("Still Loading...");
      clearInterval(testFor);

      let settingsButton = document.createElement("div");
      settingsButton.id = "-meow-instatyper-settings";
      settingsButton.className = "btn btn--fw";
      settingsButton.innerHTML = `<svg class="icon icon-smiley btn-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/dist/site/images/icons/icons.css.svg#icon-smiley"></use></svg>InstaTyper Settings`;

      settingsButton.onclick = function () {
        settingsButton.classList.add("is-active");
        allButtons.forEach((b) => {
          b.classList.remove("is-active");
        });
        let section = settingsButton.parentElement.parentElement.nextElementSibling;
        section.style.display = "none";
        let newSection =
          document.getElementById("-meow-instatyper-settings-section") ||
          document.createElement("div");
        newSection.className = "g-b g-b--9of12";
        newSection.id = "-meow-instatyper-settings-section";
        newSection.innerHTML = "";
        newSection.style.display = "";

        let title = document.createElement("h2");
        title.className = "tbs";
        title.innerHTML = "InstaTyper Settings";
        newSection.appendChild(title);

        let desc = document.createElement("p");
        desc.className = "tc-ts";
        desc.innerHTML = "Change the settings of the InstaTyper!";
        newSection.appendChild(desc);

        let hole1 = document.createElement("div");
        hole1.className = "g well well--b";
        let hole2 = document.createElement("div");
        hole2.className = "g-b g-b--7of12";
        let hole3 = document.createElement("div");
        hole3.className = "input";

        let sectionLabel = document.createElement("label");
        sectionLabel.className = "input-label";
        sectionLabel.innerHTML = "Delay Between Key Presses";
        hole3.appendChild(sectionLabel);

        let sectionInputStyle = document.createElement("style");
        sectionInputStyle.innerHTML = `#-meow-instatyper-settings-delay::-webkit-outer-spin-button,#-meow-instatyper-settings-delay::-webkit-inner-spin-button{-webkit-appearance: none;margin: 0;}`;
        document.head.appendChild(sectionInputStyle);

        let sectionInput = document.createElement("input");
        sectionInput.type = "text";
        sectionInput.className = "input-field";
        sectionInput.id = "-meow-instatyper-settings-delay";
        sectionInput.value = 10;
        sectionInput.style["-moz-appearance"] = "textfield";
        sectionInput.onkeyup = function () {
          let num = Number(sectionInput.value) || "";
          if (sectionInput.value == "-" || sectionInput.value == "0") return;

          if (num < -2) num = -1;
          if (num > 5000) num = 5000;
          if (String(num).includes(".")) num = Math.floor(num);
          if (String(num).includes("e")) num.value = 0;
          sectionInput.value = num;
        };
        hole3.appendChild(sectionInput);

        hole2.appendChild(hole3);
        hole1.appendChild(hole2);

        let hole12 = document.createElement("div");
        hole12.className = "g-b g-b--5of12";
        let hole13 = document.createElement("ul");
        hole13.className = "list list--xxs ptm";

        let line1 = document.createElement("li");
        line1.className = "list-item";
        line1.innerHTML = `<div class="tsxs tsi tc-ts"><b>Units:</b> ms <b>Min:</b> -1 <b>Max:</b> 5000</div>`;
        hole13.appendChild(line1);
        let line2 = document.createElement("li");
        line2.className = "list-item";
        line2.innerHTML = `<div class="tsxs tsi tc-ts">Use <b>-1</b> for no delay, <b>0</b> for minimal delay.</div>`;
        hole13.appendChild(line2);

        hole12.appendChild(hole13);
        hole1.appendChild(hole12);

        newSection.appendChild(hole1);

        section.parentElement.appendChild(newSection);
      };

      refButton.parentElement.insertBefore(settingsButton, refButton.nextElementSibling);

      allButtons.forEach((b) => {
        b.onclick = function () {
          settingsButton.classList.remove("is-active");
          settingsButton.parentElement.parentElement.nextElementSibling.style.display = "";
          document.getElementById("-meow-instatyper-settings-section").style.display = "none";
        };
      });
    });
  }
})();
