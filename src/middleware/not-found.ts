import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res) => {
  res.status(404).json({ messege: "The page was not found!" });
};
export { notFound };
