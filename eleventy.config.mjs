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
    .use(markdownItFootnote) // Restore footnotes
    .use(markdownItContainer, "spirit")
    .use(markdownItContainer, "bible")
    .use(markdownItContainer, "grey")
    .use(markdownItContainer, "note") 
    .use(markdownItContainer, "expand", {
      validate: params => params.trim().match(/^expand\s+(.*)$/),
      render: (tokens, idx) => {
        const m = tokens[idx].info.trim().match(/^expand\s+(.*)$/);
        return tokens[idx].nesting === 1 
          ? `<details><summary>${mdLib.utils.escapeHtml(m[1])}</summary><div class="details-content">\n`
          : `</div></details>\n`;
      }
    });
    
  eleventyConfig.setLibrary("md", mdLib);

  // Passthrough Mappings
  // This takes files from src/ and puts them in the root of _site/
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