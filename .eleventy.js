module.exports = function (eleventyConfig) {
  // Markdown plugins setup (anchors, containers, etc.)

  // Passthrough copies - explicit for CSS
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");

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