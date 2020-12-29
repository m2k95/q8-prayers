# Kuwait Prayer Times
Kuwait Prayer Times CDN based on https://aladhan.com API services

Demo [link](https://prayers-demo.mymk95.vercel.app/)

## Getting Started
Copy-paste the stylesheet `<link>` into your `<head>` to load our CSS

`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mymk95/q8-prayers@latest/dist/all.min.css">`

Include our JavaScript before the closing body

`<script src="https://cdn.jsdelivr.net/gh/mymk95/q8-prayers@latest/dist/all.min.js"></script>`

Create a div element with an id of q8prayers in your project

`<div id="q8prayers"></div>`

## Options
- `data-lang="ar"` to display prayer times in Arabic *(defualts to en)*
- `data-width="200"` to set the width (in pixels) of the table *(defaults to 150)*

## Starter Template
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Q8 Prayer Times CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mymk95/q8-prayers@latest/dist/all.min.css">

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
