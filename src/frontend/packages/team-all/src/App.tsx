// import { useState } from "react";

import("content/App").then((module) => {
  const { XContent } = module;
  customElements.define("x-content", XContent);
});
import("search/App").then((module) => {
  const { XSearch } = module;
  customElements.define("x-search", XSearch);
  document.querySelector('x-search')?.addEventListener('search', (e) => {
    console.log(e);
  });
});

const App = () => {
  // const [contents, setContents] = useState(null);
  return (
    <>
      <x-search></x-search>
    </>
  );
};

export default App;
