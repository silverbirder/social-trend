type AppProps = {
  ids: string;
};

type SnsSet = {
  name: string;
  id: string;
};

type SnSContentsProps = {
  snsSets: SnsSet[];
};

type TwitterContentProps = {
  id: string;
};

const TwitterContent = (props: TwitterContentProps) => {
  return (
    <o-embed
      src={"https://twitter.com/openwc/status/" + props.id}
      proxy="https://silverbirder-cors-anywhere.herokuapp.com"
      height="643px"
    />
  );
};

const SnsContents = (props: SnSContentsProps) => {
  const { snsSets } = props;
  const map = snsSets.map((set: SnsSet) => {
    switch (set.name) {
      case "tw":
        return <TwitterContent key={set.name + set.id} id={set.id} />;
    }
  });
  const divStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 3fr)",
    // gridTemplateColumns: "repeat(auto-fit, 10em)",
    // gridTemplateColumns: "auto",
    // gridTemplateRows: "auto 1fr auto",
    gap: "20px",
  };

  return <div style={divStyle}>{map}</div>;
};

const App = (props: AppProps) => {
  const values: SnsSet[] = props.ids.split(",").map((nameAndId) => {
    const [name, id] = nameAndId.split("-");
    return { name: name, id: id };
  });
  console.log(values);
  return <SnsContents snsSets={values} />;
};

export default App;
