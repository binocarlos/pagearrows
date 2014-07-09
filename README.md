pagearrows
==========

navigation arrows for a book

## installation

```
$ component install binocarlos/pagearrows
```

## example

```js
var PageArrows = require('pagearrows')
var arrows = PageArrows()
arrows.appendTo(document.querySelector('#book'))

// set the current page and the total pages to show/hide arrows
// set page 4 of 10
arrows.setPage(4, 10)

// hide/show arrows when the book changes
book.on('view:index', arrows.setPage.bind(arrows))

// change the HTML of an arrow element when its rendered
arrows.on('render', function(elem, side){
	elem.innerHTML = side + ' arrow'
})

// turn the book when the arrows are clicked
arrows.on('click', function(side, direction){
	book.turnDirection(direction)
})
```

## api

### `var arrows = PageArrows()`

Create a new set of page arrows

### `arrows.setPage(index, totalPages)`

Assign the number of pages for the navbar - pages can be an array or a number

## events

### `arrows.on('render', function(elem, side){})`

An arrow element has been created - side is 'left' or 'right'

### `arrows.on('click', function(side, direction){})`

An arrow has been clicked - side is 'left' or 'right' - direction is -1 or 1

## css

The DOM structure for the arrows:

```html
<div class="pagearrows-container">
	<div id="left" class="pagearrows-arrow"></div>
	<div id="right" class="pagearrows-arrow"></div>
</div>
```

## licence
MIT