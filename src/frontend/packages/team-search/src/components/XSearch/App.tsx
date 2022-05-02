import React, { useCallback, useContext } from "react";
import { useState } from "react";
import { CustomElementContext } from "./XSearch";

type DomainType = {
  name: string;
  checked: boolean;
};

type KeywordSearchProps = {
  keyword: string;
  setKeyword: (keyword: string) => void;
};

const KeywordSearch = React.memo(function KeywordSearch(
  props: KeywordSearchProps
) {
  console.log("render KeywordSearch");
  const { keyword, setKeyword } = props;
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setKeyword(event.target.value),
    [setKeyword]
  );
  return (
    <input
      type="text"
      placeholder="Enter keyword"
      value={keyword}
      onChange={onChange}
    ></input>
  );
});

type DomainSearchProps = {
  domains: DomainType[];
  setDomains: (domains: DomainType[]) => void;
};

const DomainSearch = React.memo(function DomainSearch(
  props: DomainSearchProps
) {
  console.log("render DomainSearch");

  const { domains, setDomains } = props;
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDomains = [...domains];
      const { value, checked } = e.target;
      newDomains.forEach((domain) => {
        if (domain.name !== value) return;
        domain.checked = checked;
      });
      setDomains(newDomains);
    },
    [domains, setDomains]
  );
  return (
    <p>
      {domains.map((domain) => (
        <span key={domain.name}>
          <input
            type="checkbox"
            name="domain"
            value={domain.name}
            onChange={onChange}
            checked={domain.checked}
          />
          {domain.name}
        </span>
      ))}
    </p>
  );
});

type SearchButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  disabled: boolean;
};

const SearchButton = React.memo(function SearchButton(
  props: SearchButtonProps
) {
  console.log("render SearchButton");
  const { onClick, disabled } = props;
  return (
    <input
      type="button"
      value="Search"
      onClick={onClick}
      disabled={disabled}
    ></input>
  );
});

const useSearchButtonClick = (keyword: string, domains: DomainType[]) => {
  const [disabled, setDisabled] = useState(false);
  const customElement = useContext(CustomElementContext);
  const onClick = useCallback(
    async (_: React.MouseEvent) => {
      const url = new URL(`${process.env.REACT_APP_API_URL}`);
      const params = url.searchParams;
      params.append("keyword", keyword);
      params.append(
        "hosts",
        domains
          .filter((domain) => domain.checked)
          .map((domain) => domain.name)
          .join(",")
      );
      try {
        setDisabled(true);
        const res = await (await fetch(url.toString())).json();
        customElement.dispatchEvent(new CustomEvent("search", { detail: res }));
      } catch (e) {
        console.error(e);
      } finally {
        setDisabled(false);
      }
    },
    [customElement, domains, keyword]
  );
  return { onClick, disabled };
};

const SearchForm = React.memo(function SearchForm() {
  console.log("render SearchForm");
  const [keyword, setKeyword] = useState("");
  const [domains, setDomains] = useState<DomainType[]>([
    { name: "speakerdeck.com", checked: true },
    { name: "docs.google.com", checked: false },
    { name: "www.slideshare.net", checked: false },
  ]);
  const { onClick, disabled } = useSearchButtonClick(keyword, domains);

  return (
    <>
      <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
      <DomainSearch domains={domains} setDomains={setDomains} />
      <SearchButton onClick={onClick} disabled={disabled} />
    </>
  );
});

const App = React.memo(function App() {
  console.log("render App");
  return <SearchForm />;
});

export default App;
