import("content/App").then((module) => {
  const { XContent } = module;
  customElements.define("x-content", XContent);
});
import("search/App").then((module) => {
  const { XSearch } = module;
  customElements.define("x-search", XSearch);
});

const App = () => {
  return (
    <>
      <x-content></x-content>
      <x-search></x-search>
    </>
  );
};

export default App;
