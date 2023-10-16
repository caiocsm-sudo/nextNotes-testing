import styles from '../Notes.module.css';

const apiPocketbaseServer = "http://127.0.0.1:8090";

async function getNote(noteId: string) {
  const res = await fetch(
    `${apiPocketbaseServer}/api/collections/tasks/${noteId}`,
    { next: { revalidate: 10 } }
  );
  // revalidate = regenerate a page after a certain number of seconds
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div>
        <h2 className={styles.cardTitle}>{note.title}</h2>
        <h5 className={styles.content}>{note.content}</h5>
        <p className={styles.createdAt}>{note.created}</p>
      </div>
    </div>
  );
}
