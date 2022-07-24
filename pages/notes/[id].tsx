import { ReactPropTypes } from "react";
import { Note } from "@/types/types";

const Note: React.FC<Note> = ({ id, title, description, author }) => {
  return (
    <>
      <p>id: {id}</p>
      <p>
        title: {title} written by: {author.name}
      </p>
      <p>content: {description}</p>
    </>
  );
};
