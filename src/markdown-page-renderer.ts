import { PageData, PageRenderer } from "@taprootio/rollup-plugin-taproot"
import MarkdownIt from "markdown-it"
import Anchor from "markdown-it-anchor"
import TOC from "markdown-it-toc-done-right"
import Table from "markdown-it-multimd-table"
import matter from "gray-matter"

const compiler = new MarkdownIt({
  html: true,
  typographer: true,
})
  .use(Anchor, {
    permalink: Anchor.permalink.ariaHidden({
      placement: "before",
    }),
  })
  .use(TOC)
  .use(Table)

const MarkdownPageRenderer: PageRenderer = {
  FileMatcher: new RegExp("([a-zA-Z0-9s_\\.-:])+(.md)$"),
  Render: (source: string) => {
    const withYAML = matter(source)
    const yamlData = withYAML.data as PageData
    const rendered = compiler.render(withYAML.content)

    console.log(JSON.stringify(yamlData))

    return {
      Contents: rendered,
      Data: yamlData,
    }
  },
}

export { MarkdownPageRenderer }
