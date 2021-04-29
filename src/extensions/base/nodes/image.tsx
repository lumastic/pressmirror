import { NodeSpec } from "prosemirror-model";

const image: NodeSpec = {
  inline: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null }
  },
  group: "inline",
  draggable: true,
  parseDOM: [
    {
      tag: "img[src]",
      getAttrs(dom: HTMLElement): Record<string, unknown> {
        return {
          src: dom.getAttribute("src"),
          title: dom.getAttribute("title"),
          alt: dom.getAttribute("alt")
        };
      }
    }
  ],
  toDOM(node) {
    const { src, alt, title } = node.attrs;
    return ["img", { src, alt, title }];
  }
};

export default image;
