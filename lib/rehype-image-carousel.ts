/**
 * Rehype plugin: merge consecutive paragraphs that contain only a single image
 * into one div with dataCarousel, so the React layer can render them as a carousel.
 * Uses minimal Hast-like types to avoid depending on @types/hast.
 */
interface HastElement {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children: HastNode[];
}
interface HastRoot {
  type: "root";
  children: HastNode[];
}
type HastNode = HastElement | HastRoot | { type: string; [key: string]: unknown };

function isElement(node: HastNode): node is HastElement {
  return node.type === "element";
}

export function rehypeImageCarousel() {
  return (tree: HastRoot) => {
    const children = tree.children;
    const newChildren: HastNode[] = [];
    let i = 0;

    while (i < children.length) {
      const run: HastElement[] = [];
      while (i < children.length) {
        const child = children[i];
        if (!isElement(child) || !isImageOnlyParagraph(child)) break;
        run.push(child);
        i++;
      }

      if (run.length >= 2) {
        const images = run.flatMap((p) =>
          p.children.filter(
            (c): c is HastElement =>
              isElement(c) && c.tagName === "img"
          )
        );
        newChildren.push({
          type: "element",
          tagName: "div",
          properties: {
            dataCarousel: "true",
            className: ["image-carousel-wrapper"],
          },
          children: images,
        });
      } else if (run.length === 1) {
        newChildren.push(run[0]);
      }

      if (i < children.length) {
        newChildren.push(children[i]);
        i++;
      }
    }

    tree.children = newChildren;
  };
}

function isImageOnlyParagraph(node: HastElement): boolean {
  return (
    node.tagName === "p" &&
    Array.isArray(node.children) &&
    node.children.length === 1 &&
    isElement(node.children[0]) &&
    node.children[0].tagName === "img"
  );
}
