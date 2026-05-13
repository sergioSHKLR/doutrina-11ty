// .eleventy.js
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItContainer = require("markdown-it-container");
const footnote = require("markdown-it-footnote");
const tocPlugin = require("markdown-it-toc-done-right");

module.exports = function(eleventyConfig) {

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
    // Restore all your containers
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
    // Add more containers if needed (notes, bible, spirit, etc.)
    .use(markdownItContainer, 'notes')
    .use(markdownItContainer, 'bible')
    .use(markdownItContainer, 'spirit')
    .use(footnote)
    .use(tocPlugin, {
      containerClass: "toc",
      listType: "ul",
      level: [2, 3, 4, 5],
      includeLevel: [2, 3, 4, 5]
    });

  eleventyConfig.setLibrary("md", md);

  // Filters for TOC
  eleventyConfig.addFilter("toc", function(content) {
    const match = content.match(/<nav class="toc">[\s\S]*?<\/nav>/i);
    return match ? match[0] : '';
  });

  eleventyConfig.addFilter("stripToc", function(content) {
    return content.replace(/<nav class="toc">[\s\S]*?<\/nav>/i, '');
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: false,
  };
};