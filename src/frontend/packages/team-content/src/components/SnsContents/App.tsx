type AppProps = {
  ids: string;
};

const App = (props: AppProps) => {
  return <>Content {props.ids}</>;
};

export default App;
