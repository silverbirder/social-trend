import React, { useEffect, useState } from "react";

type SearchResultProps = {
  data: any[];
};
const SearchResult = (props: SearchResultProps) => {
  const { data } = props;
  return (
    <>
      {data.map((d) => (
        <div key={d.id}>
          {d.id}: {d.text}
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  useEffect(() => {
    import("content/App").then((module) => {
      const { XContent } = module;
      customElements.define("x-content", XContent);
    });
    import("search/App").then((module) => {
      const { XSearch } = module;
      customElements.define("x-search", XSearch);
      const xSearchElement = document.querySelector("x-search");
      xSearchElement?.addEventListener("search", ((e: CustomEvent) => {
        setSearchResult(e.detail);
      }) as EventListener);
    });
  }, []);
  return (
    <>
      <x-search></x-search>
      <SearchResult data={searchResult} />
    </>
  );
};

export default App;
