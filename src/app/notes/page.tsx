import Link from "next/link";
import styles from "./Notes.module.css";
import PocketBase from 'pocketbase';
import CreateNote from "./CreateNote";

const apiPocketbaseServer = "http://127.0.0.1:8090";

async function getNotes() {
  // pagination pocketbase = page=num&perPage=num

  const pb = new PocketBase(apiPocketbaseServer);
  const result = await pb.collection('tasks').getList();

  console.log(result);

  return result?.items as any[];
}

const Note = ({ note }: any) => {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <h5 className={styles.content}>{content}</h5>
        <p className={styles.createdAt}>{created.slice(0, 10)}</p>
      </div>
    </Link>
  );
};

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div className={styles.cardsWrapper}>
      <h1 className={styles.title}>Notes</h1>
      <div className={styles.cardsContainer}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>

      <CreateNote />
    </div>
  );
}
