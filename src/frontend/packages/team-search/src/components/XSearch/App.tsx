import React, { useCallback, useContext, useRef } from "react";
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
  const { keyword, setKeyword } = props;
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setKeyword(event.target.value),
    [setKeyword]
  );
  return (
    <input
      type="text"
      name="keyword"
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

const useSearchButtonClick = (formRef: React.RefObject<HTMLFormElement>) => {
  const [disabled, setDisabled] = useState(false);
  const customElement = useContext(CustomElementContext);
  const onClick = useCallback(
    async (_: React.MouseEvent) => {
      const url = new URL(`${process.env.REACT_APP_API_URL}`);
      const params = url.searchParams;
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      for (const [key, value] of formData) {
        params.append(key, value.toString());
      }
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
    [customElement, formRef]
  );
  return { onClick, disabled };
};

const SearchForm = React.memo(function SearchForm() {
  const [keyword, setKeyword] = useState("");
  const [domains, setDomains] = useState<DomainType[]>([
    { name: "speakerdeck.com", checked: true },
    { name: "docs.google.com", checked: false },
    { name: "www.slideshare.net", checked: false },
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const { onClick, disabled } = useSearchButtonClick(formRef);

  return (
    <form ref={formRef}>
      <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
      <DomainSearch domains={domains} setDomains={setDomains} />
      <SearchButton onClick={onClick} disabled={disabled} />
    </form>
  );
});

const App = React.memo(function App() {
  return <SearchForm />;
});

export default App;
