import { type TaprootPageRenderer } from "@taprootio/rollup-plugin-taproot/dist/models/TaprootPageRenderer"
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

interface MarkdownYAML {
  title: string
  lastUpdated?: Date
  template?: string
  canonical?: string
}

const MarkdownPageRenderer: TaprootPageRenderer = {
  FileMatcher: new RegExp("([a-zA-Z0-9s_\\.-:])+(.md)$"),
  Render: (source: string) => {
    const withYAML = matter(source)
    const yamlData = withYAML.data as MarkdownYAML
    const rendered = compiler.render(withYAML.content)

    return {
      Contents: rendered,
      Data: {
        title: yamlData.title,
        canonical: yamlData.canonical,
        lastUpdated: yamlData.lastUpdated,
        template: yamlData.template,
      },
    }
  },
}

export { MarkdownPageRenderer }
