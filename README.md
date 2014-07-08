pagenav
=======

navigation toolbar for a book

## installation

```
$ component install binocarlos/pagenav
```

## example

```js
var PageNav = require('pagenav')
var nav = PageNav()
nav.appendTo(document.querySelector('#nav'))

var pages = [{
	title:'Page 1'	
},{
	title:'Page 2'
},{
	title:'Page 3'
}]

// pages can be an array or just a number
nav.setPages(pages)

// change the HTML of a nav element
nav.on('page', function(elem, index){
	elem.innerHTML = '0' + index
})

nav.on('click', function(index){
	// set the book to page 'index'	
})

// set the highlighted page to 3
nav.setPage(3)
```

## api

### `var nav = PageNav()`

Create a new navbar

### `nav.setPages(pages)`

Assign the number of pages for the navbar - pages can be an array or a number

### `nav.setPage(index)`

Set the currently active page of the navbar

## events

### `nav.on('page', function(elem, index){})`

A page element has been rendered

### `nav.on('click', function(index){})`

A page element has been clicked

## css

The DOM structure for the navbar:

```html
<div class="pagenav-bar">
	<div class="pagenav-page">1</div>
	<div class="pagenav-page">2</div>
	<div class="pagenav-page pagenav-active">3</div>
	<div class="pagenav-page">4</div>
</div>
```

## licence
MIT