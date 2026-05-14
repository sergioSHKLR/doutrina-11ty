module.exports = function (eleventyConfig) {
  // Markdown plugins setup (anchors, containers, etc.)

  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");

  // Register TOC filter
  const nestingToc = require('eleventy-plugin-nesting-toc');
  eleventyConfig.addPlugin(nestingToc);

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