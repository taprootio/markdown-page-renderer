'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MarkdownIt = require('markdown-it');
var Anchor = require('markdown-it-anchor');
var TOC = require('markdown-it-toc-done-right');
var Table = require('markdown-it-multimd-table');
var matter = require('gray-matter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MarkdownIt__default = /*#__PURE__*/_interopDefaultLegacy(MarkdownIt);
var Anchor__default = /*#__PURE__*/_interopDefaultLegacy(Anchor);
var TOC__default = /*#__PURE__*/_interopDefaultLegacy(TOC);
var Table__default = /*#__PURE__*/_interopDefaultLegacy(Table);
var matter__default = /*#__PURE__*/_interopDefaultLegacy(matter);

const compiler = new MarkdownIt__default["default"]({
    html: true,
    typographer: true,
})
    .use(Anchor__default["default"], {
    permalink: Anchor__default["default"].permalink.ariaHidden({
        placement: "before",
    }),
})
    .use(TOC__default["default"])
    .use(Table__default["default"]);
const MarkdownPageRenderer = {
    FileMatcher: new RegExp("([a-zA-Z0-9s_\\.-:])+(.md)$"),
    Render: (source) => {
        const withYAML = matter__default["default"](source);
        const yamlData = withYAML.data;
        const rendered = compiler.render(withYAML.content);
        console.log(JSON.stringify(yamlData));
        return {
            Contents: rendered,
            Data: yamlData,
        };
    },
};

exports.MarkdownPageRenderer = MarkdownPageRenderer;
//# sourceMappingURL=markdown-page-renderer.js.map
