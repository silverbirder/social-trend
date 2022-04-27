declare namespace JSX {
  interface IntrinsicElements {
    [tagName: string]: any;
  }
}

declare module "content/App" {
  const XContent: CustomElementConstructor;

  export { XContent };
}

declare module "search/App" {
  const XSearch: CustomElementConstructor;
  export { XSearch };
}
