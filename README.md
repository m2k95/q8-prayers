# Kuwait Prayer Times
Kuwait Prayer Times based on https://aladhan.com API services

Amiri font used for Arabic text from https://www.amirifont.org

## Getting Started
Include our JavaScript before the closing body

`<script src="https://cdn.jsdelivr.net/gh/mymk95/q8-prayers@latest/dist/all.min.js"></script>`

Create a div element with an id of q8prayers in your project

`<div id="q8prayers"></div>`

> You can add more than one element in a single page
>
> You can specify a version instead of using latest release, please refer to [releases](https://github.com/mymk95/q8-prayers/releases) to select a version
>
> Example: `<script src="https://cdn.jsdelivr.net/gh/mymk95/q8-prayers@v1.0.1/dist/all.min.js"></script>`
> 
> Version 1.0.7+ will load CSS to your page, if using an older version, please include our stylesheet `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mymk95/q8-prayers@latest/dist/all.min.css">`

## Options
- `data-lang="ar"` to display prayer times in Arabic *(defaults to en)*
- `data-width="200"` to set the width (in pixels) of the table *(defaults to 150)*
- `data-theme="dark"` to display prayer times in darkmode

## Starter Template
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Q8 Prayer Times Starter Template</title>
  </head>
  <body>
    <!-- Q8 Prayer Times Element -->
    <div id="q8prayers" data-lang="ar"></div>

    <!-- Q8 Prayer Times JavaScript -->
    <script src="https://cdn.jsdelivr.net/gh/mymk95/q8-prayers@latest/dist/all.min.js"></script>
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
