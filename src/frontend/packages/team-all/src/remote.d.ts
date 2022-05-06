declare namespace JSX {
  interface IntrinsicElements {
    [tagName: string]: any;
  }
}

declare module "content/App" {
  const XContent: CustomElementConstructor;
  const SnsContents: CustomElementConstructor;

  export { XContent, SnsContents };
}

declare module "search/App" {
  const XSearch: CustomElementConstructor;
  export { XSearch };
}
