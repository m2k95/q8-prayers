# Kuwait Prayer Times
Kuwait Prayer Times based on [AlAdhan](https://aladhan.com) API services

[Amiri font](https://www.amirifont.org) used for Arabic text

## Getting Started
Include our JavaScript before the closing body

`<script src="https://q8p.io/js"></script>`

Include our CSS in your project

`<link rel="stylesheet" href="https://q8p.io/css">`

Create a div element with an id of q8prayers in your project

`<div id="q8prayers"></div>`

> You can add more than one element in a single page

## Options
- Languages
  - `data-lang="en"` Display prayer times in English *(default)*
  - `data-lang="ar"` Display prayer times in Arabic
- Themes:
  - `data-theme="light"` Display prayer times in ligh mode *(default)*
  - `data-theme="dark"` Display prayer times in dark mode
  - `data-theme="black"` Display prayer times in all black mode
  - `data-theme="white"` Display prayer times in all white mode
- Table Sizes:
  - `data-size="sm"` Display table in small size
  - `data-size="md"` Display table in medium size *(default)*
  - `data-size="lg"` Display table in large size
  - `data-size="xl"` Display table in xlarge size

## Starter Template
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Q8 Prayer Times CSS -->
    <link rel="stylesheet" href="https://q8p.io/css">

    <title>Q8 Prayer Times Starter Template</title>
  </head>
  <body>
    <!-- Q8 Prayer Times Element -->
    <div id="q8prayers" data-lang="ar"></div>

    <!-- Q8 Prayer Times JavaScript -->
    <script src="https://q8p.io/js"></script>
  </body>
</html>
```

## Hint
Add the following styling to center prayer times table in a `<div>` element

```css
#q8prayers table{
  margin-right: auto;
  margin-left: auto;
}
```
