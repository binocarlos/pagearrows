var Emitter = require('emitter')
var classes = require('classes')
var css = require('css')

module.exports = PageArrows;

var defaults = {
  width:10,
  inset:2
}

function PageArrows (opts) {
  if (!(this instanceof PageArrows)) return new PageArrows(opts);
  opts = opts || {}
  Object.keys(defaults || {}).forEach(function(key){
    if(!opts[key]){
      opts[key] = defaults[key]
    }
  })
  if(!opts.height){
    opts.height = opts.width
  }
  this._opts = opts
}

Emitter(PageArrows.prototype)

PageArrows.prototype.setPage = function (index, total) {
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
  var props = {
    position:'absolute',
    width:this._opts.width + '%',
    height:this._opts.height + '%',
    top:(50 - (this._opts.height/2)) + '%'
  }
  props[side] = this._opts.inset + '%'
  css(arrow, props)
  this.emit('render', arrow, side)
  return arrow
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