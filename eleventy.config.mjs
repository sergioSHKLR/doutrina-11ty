import markdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";
import markdownItFootnote from "markdown-it-footnote";

export default function(eleventyConfig) {

  // Configure Markdown Library
  const mdLib = markdownIt({ 
    html: true,
    linkify: true,
    typographer: true 
  })
    .use(markdownItFootnote) // Footnotes
    .use(markdownItContainer, "spirit")
    .use(markdownItContainer, "bible")
    .use(markdownItContainer, "kardec")
    .use(markdownItContainer, "expand", {
      validate: params => params.trim().match(/^expand\s+(.*)$/),
      render: (tokens, idx) => {
        const m = tokens[idx].info.trim().match(/^expand\s+(.*)$/);
        return tokens[idx].nesting === 1 
          ? `<details><summary>${mdLib.utils.escapeHtml(m[1])}</summary><div class="details-content">\n`
          : `</div></details>\n`;
      }
    })
    // === NEW: notes shortcode ===
    .use(markdownItContainer, "notes", {
      validate: () => true,
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          return `<div class="notes">\n`;
        } else {
          return `</div>\n`;
        }
      }
    });

  eleventyConfig.setLibrary("md", mdLib);

  // Passthrough files
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};