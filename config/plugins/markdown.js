const markdownIt = require('markdown-it');
const markdownItPrism = require('markdown-it-prism');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItClass = require('@toycode/markdown-it-class');
const markdownItLinkAttributes = require('markdown-it-link-attributes');
const markdownItEmoji = require('markdown-it-emoji');
const markdownItFootnote = require('markdown-it-footnote');
const markdownitMark = require('markdown-it-mark');
const markdownitAbbr = require('markdown-it-abbr');
const {slugifyString} = require('../utils');

const markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})
  // https://github.com/11ty/eleventy/issues/2438
  .disable('code')
  .use(markdownItPrism, {
    defaultLanguage: 'plaintext'
  })
  .use(markdownItAnchor, {
    slugify: slugifyString,
    tabIndex: false,
    permalink: markdownItAnchor.permalink.headerLink({
      class: 'heading-anchor'
    })
  })
  .use(markdownItClass, {
    ol: 'list',
    ul: 'list'
  })
  .use(markdownItLinkAttributes, {
    // Only external links (explicit protocol; internal links use relative paths)
    pattern: /^https?:/,
    attrs: {
      target: '_blank',
      rel: 'noreferrer noopener'
    }
  })
  .use(markdownItEmoji)
  .use(markdownItFootnote)
  .use(markdownitMark)
  .use(markdownitAbbr);

module.exports = markdownLib;