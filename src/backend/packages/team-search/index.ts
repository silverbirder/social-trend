const { Firestore } = require("@google-cloud/firestore");
import { QuerySnapshot } from "@google-cloud/firestore";
import express, { Application, Request, Response } from "express";
import "dotenv/config";

const app: Application = express();
const PORT = 3000;
const firestore = new Firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_req: Request, res: Response) => {
  firestore
    .collection("tweets")
    .limit(1)
    .get()
    .then((querySnapshot: QuerySnapshot<any>) => {
      querySnapshot.forEach((documentSnapshot) => {
        console.log(`Found document at ${documentSnapshot.ref.path}`);
      });
    });
  return res.status(200).send({
    message: "Hello World!",
  });
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
