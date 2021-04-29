import { DOMOutputSpec, MarkSpec } from "prosemirror-model";

const link: MarkSpec = {
  attrs: {
    href: {},
    title: { default: null }
  },
  inclusive: false,
  parseDOM: [
    {
      tag: "a[href]",
      getAttrs(dom: HTMLElement): Record<string, unknown> {
        return {
          href: dom.getAttribute("href"),
          title: dom.getAttribute("title")
        };
      }
    }
  ],
  toDOM(node): DOMOutputSpec {
    const { href, title } = node.attrs;
    return ["a", { href, title }, 0];
  }
};

export default link;
