//@ts-ignore
import { FirestoreCollection } from "react-firestore";

const App = () => {
  return (
    <>
      <FirestoreCollection
        path="tweets"
        filter={[
          ["slideHosts", "array-contains-any", ["speakerdeck.com"]],
          ["createdAt", ">=", new Date("2022-04-21 00:00:00")],
          ["createdAt", "<=", new Date("2022-04-21 23:59:59")],
        ]}
        limit={10}
        //@ts-ignore
        render={({ isLoading, data }) => {
          return isLoading ? (
            <>loading</>
          ) : (
            <div>
              <h1>Tweet</h1>
              <div>
                {data.map((tweet: any) => (
                  <div key={tweet.id}>{tweet.text}</div>
                ))}
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default App;
