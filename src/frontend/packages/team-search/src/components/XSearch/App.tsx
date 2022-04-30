import React from "react";
import { useState } from "react";

type Condition = {
  keyword: string;
};
const newCondition = () => {
  return { keyword: "" };
};

type KeywordSearchProps = {
  condition: Condition;
  setCondition: (condition: Condition) => void;
};

const KeywordSearch = React.memo((props: KeywordSearchProps) => {
  console.log("render KeywordSearch");
  const { condition, setCondition } = props;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCond = { ...condition };
    newCond.keyword = e.target.value;
    setCondition(newCond);
  };
  return (
    <input
      type="text"
      placeholder="Enter keyword"
      value={condition.keyword}
      onChange={onChange}
    ></input>
  );
});

type SearchButtonProps = {
  condition: Condition;
};

const SearchButton = React.memo((props: SearchButtonProps) => {
  console.log("render SearchButton");
  const { condition } = props;
  const onClick = (_: React.MouseEvent) => {
    console.log(condition);
  };
  return <input type="button" value="Search" onClick={onClick}></input>;
});

const SearchForm = React.memo(() => {
  console.log("render SearchForm");
  const [condition, setCondition] = useState<Condition>(newCondition());
  return (
    <>
      <KeywordSearch condition={condition} setCondition={setCondition} />
      <SearchButton condition={condition} />
    </>
  );
});

const App = React.memo(() => {
  console.log("render App");
  return <SearchForm />;
});

export default App;
