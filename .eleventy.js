module.exports = function (eleventyConfig) {
  // Markdown plugins setup (anchors, containers, etc.)

  // Copy `css/fonts/` to `_site/css/fonts/`
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("src");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
  };
}