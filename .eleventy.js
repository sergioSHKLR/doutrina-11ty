// .eleventy.js
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItContainer = require("markdown-it-container");
const footnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
    .use(markdownItAttrs)
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "heading-anchor",
      permalinkSymbol: "§",
      level: [2, 3, 4, 5, 6]
    })
    // Containers
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
    .use(markdownItContainer, 'kardec')
    .use(markdownItContainer, 'spirit')
    .use(markdownItContainer, 'bible')
    .use(footnote);

  eleventyConfig.setLibrary("md", md);

  // Passthrough files
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    pathPrefix: "/doutrina-11ty/"
  };
};
