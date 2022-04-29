const App = () => {
  fetch("http://localhost:4002").then((a) => {
    a.json().then((j) => {
      console.log(j);
    });
  });
  return (
    <>
      <div>hello</div>
    </>
  );
};

export default App;
