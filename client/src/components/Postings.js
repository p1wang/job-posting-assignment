import React from "react";
import { v4 as uuidv4 } from "uuid";
import Posting from "../components/Posting";

export default function Postings({ postings }) {
  return postings.map((posting) => (
    <Posting key={uuidv4()} posting={posting} />
  ));
}
