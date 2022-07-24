import Link from "next/link";
import { useEffect, useState } from "react";
import type { Note } from "@/types/types";

const Note = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query GetAllNotes {
            notes {
              id
              title
              description
              user
            }
          }
        `,
      }),
    }).then(async (res) => setNotes((await res.json()).data));
  }, []);

  return (
    <>
      {notes.map((note) => {
        return (
          <Link key={note.id} href={`/notes/${note.id}`}>
            {note.title}
          </Link>
        );
      })}
    </>
  );
};

export default Note;
