const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItContainer = require("markdown-it-container");
const footnote = require("markdown-it-footnote");
const toc = require("markdown-it-toc-done-right");

module.exports = function(eleventyConfig) {
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
    // Important order: attrs → anchor → toc
    .use(markdownItAttrs)
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "heading-anchor",
      permalinkSymbol: "§",
      permalinkSpace: false,
      permalinkBefore: false,
      level: [2, 3, 4, 5, 6],           // we usually don't want h1 in TOC
      slugify: (str) => str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
    })
    // Containers
    .use(markdownItContainer, 'bible')
    .use(markdownItContainer, 'spirit')
    .use(markdownItContainer, 'grey-center', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? '<div class="grey-center">\n'
        : '</div>\n'
    })
    .use(markdownItContainer, 'expand', {
      render: (tokens, idx) => {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const title = token.info.trim().replace(/^expand\s*/i, '') || 'Expand';
          return `<details class="expand">\n<summary>${title}</summary>\n`;
        } else {
          return '</details>\n';
        }
      }
    })
    .use(footnote)
    // Improved TOC configuration
    .use(toc, {
      containerClass: "toc",           // class for the TOC wrapper
      listType: "ul",
      level: [2, 3, 4, 5],             // include up to h5
      listClass: "toc-list",
      itemClass: "toc-item",
      linkClass: "toc-link",
      includeLevel: [2, 3, 4, 5],
      containerHeader: '<p class="toc-title"><span class="emoji">📖</span> Nesta página</p>',
      containerFooter: '',
      slugify: (str) => str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
    });

  eleventyConfig.setLibrary("md", md);

  // Passthrough
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  return {
    dir: { 
      input: "src", 
      output: "_site" 
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: false,
  };
};