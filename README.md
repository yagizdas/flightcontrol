# bavul

`bavul` is a mobile-first pre-flight checklist for packing and airport prep.

Live site: https://bavul.app

## What It Does

- Organizes travel essentials into collapsible sections.
- Lets users tap an item to cycle through packed, not taking, and default.
- Shows checklist progress in the sticky header.
- Supports English and Turkish.
- Lets users add custom items with a name and emoji.
- Lets users remove custom items, clear all selections, or reset the list to the default checklist.
- Saves checklist state and custom items on the device with `localStorage`.

## How To Use

Tap each card once when it is packed, tap again if you are not taking it, and tap once more to return it to the default state.

Use the floating `+` button to add your own checklist item. Choose a name, pick or type an emoji, then add it to the list.

Use `Clear` to deselect everything without deleting list items. Use `Reset` to restore the default checklist.

## Project

This is a static site with no build step and no dependencies:

- `index.html` contains the app markup.
- `style.css` contains the responsive UI and dark-mode styles.
- `app.js` contains checklist data, interactions, language strings, and local storage.

## Local Preview

Open `index.html` directly in a browser, or run any static file server from this folder:

```sh
npx serve .
```
