var Emitter = require('emitter')
var classes = require('classes')
var css = require('css')

module.exports = PageArrows;

var defaults = {
  width:10,
  inset:2
}

function PageArrows (opts) {
  if (!(this instanceof PageArrows)) return new PageArrows(book, opts);
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
  props[side] = inset + '%'
  css(arrow, props)
  this.emit('render', arrow, side)
}

PageArrows.prototype.render = function () {
  if(this._element){
    return this._element
  }
  this._element = document.createElement('div')
  classes(this._element).add('pagearrows-container')
  css(this._element, {
    position:'absolute',
    width:'100%',
    height:'100%'
  })
  this._arrows = {
    left:this.createArrow('left'),
    right:this.createArrow('right')
  }
  this._element.appendChild(this._arrows.left)
  this._element.appendChild(this._arrows.right)
  return this._element
}

PageArrows.prototype.appendTo = function (target) {
  if (typeof target === 'string') target = document.querySelector(target)
  target.appendChild(this.render())
}