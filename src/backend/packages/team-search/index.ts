const { Firestore } = require("@google-cloud/firestore");
import { DocumentSnapshot, QuerySnapshot } from "@google-cloud/firestore";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Application = express();
const PORT = 4002;
const firestore = new Firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const { domain, createdDate, keyword } = req.query;
  console.log({ domain, createdDate, keyword });
  const fixedDomain =
    domain !== undefined
      ? typeof domain === "string"
        ? [domain]
        : domain
      : ["speakerdeck.com", "docs.google.com", "www.slideshare.net"];
  const nowDate = new Date();
  const fixedcreatedDate =
    createdDate !== undefined
      ? createdDate
      : `${nowDate.getFullYear()}-${
          nowDate.getMonth() + 1
        }-${nowDate.getDate()}`;
  const fixedKeyword = `${keyword}`;

  const querySnapshot: QuerySnapshot = await firestore
    .collection("tweets")
    .where("createdAt", ">=", new Date(`${fixedcreatedDate} 00:00:00`))
    .where("createdAt", "<=", new Date(`${fixedcreatedDate} 23:59:59`))
    .where("slideHosts", "array-contains-any", fixedDomain)
    .limit(10)
    .get();
  let tweets = querySnapshot.docs.map((documentSnapshot: DocumentSnapshot) => {
    return documentSnapshot.data();
  });
  if (fixedKeyword !== "") {
    const r = new RegExp(fixedKeyword);
    tweets = tweets.filter((tweet: any) => r.test(tweet.text));
  }
  console.log({ tweets });
  return res.status(200).send(tweets);
});

try {
  app.listen(PORT, () => {
    console.log(`dev server running at: http://localhost:${PORT}/`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
