# Kuwait Prayer Times
Kuwait Prayer Times based on [AlAdhan](https://aladhan.com) API services

[Amiri font](https://www.amirifont.org) used for Arabic text

## Getting Started
Include our JavaScript before the closing body

`<script src="https://cdn.jsdelivr.net/npm/q8-prayertimes/dist/all.min.js"></script>`

Include our CSS in your project

`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/q8-prayertimes/dist/all.min.css">`

Create a div element with an id of q8prayers in your project

`<div id="q8prayers"></div>`

> You can add more than one element in a single page

## Options
- `data-lang="ar"` to display prayer times in Arabic *(defaults to en)*
- `data-width="200"` to set the width (in pixels) of the table *(defaults to 150)*
- Themes:
  - `data-theme="light"` to display prayer times in default mode
  - `data-theme="dark"` to display prayer times in dark mode
  - `data-theme="black"` to display prayer times in all black mode
  - `data-theme="white"` to display prayer times in all white mode

## Starter Template
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Q8 Prayer Times CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/q8-prayertimes/dist/all.min.css">

    <title>Q8 Prayer Times Starter Template</title>
  </head>
  <body>
    <!-- Q8 Prayer Times Element -->
    <div id="q8prayers" data-lang="ar"></div>

    <!-- Q8 Prayer Times JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/q8-prayertimes/dist/all.min.js"></script>
  </body>
</html>
```

## Hint
Add the following styling to center prayer times in `<div>` element

```css
#q8prayers table{
  margin-right: auto;
  margin-left: auto;
}
```
