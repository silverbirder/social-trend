import React, { useCallback } from "react";
import { useState } from "react";

type Condition = {
  keyword: string;
  domains: DomainType[];
};

type DomainType = {
  name: string;
  checked: boolean;
};

const newCondition = (): Condition => {
  return {
    keyword: "",
    domains: [
      { name: "speakerdeck.com", checked: false },
      { name: "docs.google.com", checked: false },
      { name: "www.slideshare.net", checked: false },
    ],
  };
};

type KeywordSearchProps = {
  condition: Condition;
  setCondition: (condition: Condition) => void;
};

type UseSetConditionArgs = {
  condition: Condition;
  setCondition: (condition: Condition) => void;
};

const useUpdateCondition = (args: UseSetConditionArgs) => {
  const { condition, setCondition } = args;
  const updateCondition = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "keyword" | "domain") => {
      const newCond = { ...condition };
      switch (type) {
        case "keyword":
          newCond.keyword = e.target.value;
          break;
        case "domain":
          const { value, checked } = e.target;
          newCond.domains.forEach((domain) => {
            if (domain.name !== value) return;
            domain.checked = checked;
          });
          break;
      }
      setCondition(newCond);
    },
    [condition, setCondition]
  );
  return { updateCondition };
};

const KeywordSearch = React.memo((props: KeywordSearchProps) => {
  console.log("render KeywordSearch");
  const { condition } = props;
  const { updateCondition } = useUpdateCondition(props);
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      updateCondition(event, "keyword"),
    [updateCondition]
  );
  return (
    <input
      type="text"
      placeholder="Enter keyword"
      value={condition.keyword}
      onChange={onChange}
    ></input>
  );
});

type DomainSearchProps = {
  condition: Condition;
  setCondition: (condition: Condition) => void;
};

const DomainSearch = React.memo((props: DomainSearchProps) => {
  console.log("render DomainSearch");

  const { condition } = props;
  const { updateCondition } = useUpdateCondition(props);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => updateCondition(e, "domain"),
    [updateCondition]
  );
  return (
    <p>
      {condition.domains.map((domain) => (
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
  condition: Condition;
  setCondition: (condition: Condition) => void;
};

const SearchButton = React.memo((props: SearchButtonProps) => {
  console.log("render SearchButton");
  const { condition } = props;
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      console.log(condition);
    },
    [condition]
  );
  return <input type="button" value="Search" onClick={onClick}></input>;
});

const SearchForm = React.memo(() => {
  console.log("render SearchForm");
  const [condition, setCondition] = useState<Condition>(newCondition());
  return (
    <>
      <KeywordSearch condition={condition} setCondition={setCondition} />
      <DomainSearch condition={condition} setCondition={setCondition} />
      <SearchButton condition={condition} setCondition={setCondition} />
    </>
  );
});

const App = React.memo(() => {
  console.log("render App");
  return <SearchForm />;
});

export default App;
