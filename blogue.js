(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.doesntmatter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var makeWrapper = require("wrap.js")

var meta = JSON.parse("{\"filename\":\"./blogue/index.js\",\"pathname\":\"/blogue/\",\"title\":\"blogue\",\"date\":\"2017-06-23T19:16:14.652Z\",\"summary\":\"\"}")
var content = require("/tmp/react-site/levypla/blogue/content.js")

module.exports = makeWrapper(meta, content)
module.exports.meta = meta

},{"/tmp/react-site/levypla/blogue/content.js":2,"wrap.js":undefined}],2:[function(require,module,exports){
const h = require('react-hyperscript')
const date = require('data-bonita')

module.exports = function BlogIndex (props) {
  let pages = props.pages
  let blogposts = Object.keys(pages)
    .filter(pathname => pathname.slice(0, props.meta.pathname.length) === props.meta.pathname)
    .filter(pathname => pathname !== props.meta.pathname)
    .filter(pathname => pages[pathname].title && pages[pathname].date)

  return (
    h('ul.posts', blogposts
      .map(pathname => pages[pathname])
      .sort((a, b) => a.date < b.date ? 1 : -1)
      .map(page =>
        h('li', [
          h('h2', [
            h('a', {href: page.pathname}, page.title)
          ]),
          page.summary ? h('article.summary', [
            page.summary,
            ' ',
            h('a', {href: page.pathname}, '(...)')
          ]) : null,
          h('p', [
            h('a', {href: page.pathname}, date.abs(new Date(Date.parse(page.date))))
          ])
        ])
      )
    )
  )
}

},{"data-bonita":undefined,"react-hyperscript":undefined}]},{},[1])(1)
});