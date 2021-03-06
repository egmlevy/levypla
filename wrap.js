const h = require('react-hyperscript')
const date = require('data-bonita')
const MarkdownIt = require('markdown-it')
const matter = require('gray-matter')

module.exports = function wrapperFactory (meta, content) {
  var ext = meta.filename.split('.').slice(-1)[0]

  return function Wrapper (props) {
    switch (ext) {
      case 'txt':
        return h('article', [
          h('h1', meta.title),
          h('pre', [
            h('code', {
              dangerouslySetInnerHTML: {__html: content}
            })
          ]),
          h('p', [
            meta.pathname.slice(0, 8) === '/blogue/'
              ? h('b', date.abs(new Date(Date.parse(meta.date))))
              : null
          ])
        ])
      case 'md':
        var md = new MarkdownIt()
        var body = matter(content).content

        return h('article', [
          h('h1', meta.title),
          h('.post', {
            dangerouslySetInnerHTML: {__html: md.render(body)}
          }),
          h('p', [
            meta.pathname.slice(0, 8) === '/blogue/'
              ? h('b', date.abs(new Date(Date.parse(meta.date))))
              : null
          ])
        ])
      case 'html':
        return h('article', [
          h('.post', {
            dangerouslySetInnerHTML: {__html: content}
          }),
          h('p', [
            meta.pathname.slice(0, 8) === '/blogue/'
              ? h('b', date.abs(new Date(Date.parse(meta.date))))
              : null
          ])
        ])
      case 'js':
        return h('article', [
          h('h1', meta.title),
          h(content, props)
        ])
    }
  }
}
