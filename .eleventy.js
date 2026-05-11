const footnote = require("markdown-it-footnote");
const toc = require("markdown-it-toc-done-right");

module.exports = function(eleventyConfig) {

  // Markdown plugins
  eleventyConfig.amendLibrary("md", mdLib => {
    mdLib.use(footnote);
    mdLib.use(toc, {
      containerClass: "toc",
      listType: "ul",
      level: [2, 3, 4]
    });
    return mdLib;
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
  };
};
