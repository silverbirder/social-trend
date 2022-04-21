//@ts-ignore
import { FirestoreCollection } from "react-firestore";

const App = () => {
  return (
    <>
      <FirestoreCollection
        path="tweets"
        limit={100}
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
