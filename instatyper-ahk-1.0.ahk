; NitroType InstaTyper v1.0
; Made by Meow
; https://github.com/itzTheMeow/nitrotype-instatyper

#NoEnv ; "Avoids checking empty variables to see if they are environment variables."
#SingleInstance, force ; Makes sure you only can have one instance of the script at a time.
SendMode Event ; Allows for a delay inbetween keypresses.
SetTitleMatchMode, 2 ; Makes sure the title match matches titles that include the value.

loop {
  if (WinExist("$NT")) { ; Test for the "$NT" in the popup the userscript makes.
    WinGetTitle, typeinput ; Gets the full title of the window.
    typetext := StrSplit(typeinput, "$NT")[1] ; Splits the input to get the text to type.
    delay := StrSplit(typeinput, "$NT")[2] ; Splits the input to get the typing delay.
    WinClose ; Closes the popup.
    SetKeyDelay, delay ; Sets the delay inbetween keypresses.
    Sleep, 500 ; Waits 500ms before sending the text. (to ensure it doesnt go too early)
    Send, %typetext% ; Types out the text.
  }
}
