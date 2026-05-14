module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",
      output: process.env.ELEVENTY_OUTPUT || "docs",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    pathPrefix: "/doutrina-11ty/"
  };
};