var Emitter = require('emitter')
var classes = require('classes')
var css = require('css')

module.exports = PageArrows;

function PageArrows () {
  if (!(this instanceof PageArrows)) return new PageArrows();
}

Emitter(PageArrows.prototype)

PageArrows.prototype.setPage = function (index, total) {
  if(!this._arrows){
    return
  }
  css(this._arrows.left, {
    display:index>0 ? 'block' : 'none'
  })
  css(this._arrows.right, {
    display:index<total-1 ? 'block' : 'none'
  })
}

var directions = {
  left:-1,
  right:1
}

PageArrows.prototype.createArrow = function (side) {
  var self = this;
  var arrow = document.createElement('div') 
  classes(arrow).add('pagearrows-arrow').add('pagearrows-' + side)
  arrow.setAttribute('id', side)
  arrow.addEventListener('click', function(){
    self.emit('click', side, directions[side])
  })
  arrow.style.cursor = 'pointer'
  this.emit('render', arrow, side)
  return arrow
}

PageArrows.prototype.toggle = function (mode) {
  this._arrows.left.style.display = mode ? 'block' : 'none'
  this._arrows.right.style.display = mode ? 'block' : 'none'
}

PageArrows.prototype.render = function () {
  if(this._arrows){
    return this._arrows
  }
  this._arrows = {
    left:this.createArrow('left'),
    right:this.createArrow('right')
  }
  return this._arrows
}

PageArrows.prototype.appendTo = function (target) {
  if (typeof target === 'string') target = document.querySelector(target)
  var arrows = this.render()
  target.appendChild(arrows.left)
  target.appendChild(arrows.right)
}

PageArrows.prototype.remove = function () {
  var arrows = this.render()
  arrows.left.parentNode.removeChild(arrows.left)
  arrows.right.parentNode.removeChild(arrows.right)
}