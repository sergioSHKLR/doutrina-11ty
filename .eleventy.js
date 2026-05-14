const markdownIt = require("markdown-it");
const markdownItContainer = require("markdown-it-container");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {

  // === Markdown Configuration ===
  const mdLib = markdownIt({
    html: true,
    linkify: true,
    typographer: true
  })
    .use(markdownItFootnote)

    // Your custom containers
    .use(markdownItContainer, "spirit")
    .use(markdownItContainer, "bible")
    .use(markdownItContainer, "kardec")

    // Notes container
    .use(markdownItContainer, "notes", {
      validate: () => true,
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          return `<div class="notes">\n`;
        } else {
          return `</div>\n`;
        }
      }
    })

    // Expand / Details
    .use(markdownItContainer, "expand", {
      validate: params => params.trim().match(/^expand\s+(.*)$/),
      render: (tokens, idx) => {
        const m = tokens[idx].info.trim().match(/^expand\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          return `<details><summary>${mdLib.utils.escapeHtml(m[1])}</summary><div class="details-content">\n`;
        } else {
          return `</div></details>\n`;
        }
      }
    });

  eleventyConfig.setLibrary("md", mdLib);

  // Passthrough files
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
  };
};