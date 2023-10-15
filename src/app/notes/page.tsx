import Link from "next/link";
import styles from "./Notes.module.css";
import PocketBase from 'pocketbase';

const apiPocketbaseServer = "http://127.0.0.1:8090";

async function getNotes() {
  // pagination pocketbase = page=num&perPage=num

  const db = new PocketBase(apiPocketbaseServer);
  const altData = await db.collection('notes').getList();

  console.log(altData);

  const res = await fetch(
    `${apiPocketbaseServer}/api/collections/tasks/records`
  );
  const data = await res.json();

  return data?.items as any[];
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
    </div>
  );
}
