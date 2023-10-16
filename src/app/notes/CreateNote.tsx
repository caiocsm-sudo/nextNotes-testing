"use client";

import styles from "./CreateNote.module.css";

import { useState } from "react";

import { useRouter } from "next/router";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createCardHandler = async function () {
    await fetch("http://127.0.0.1:8090/api/collections/tasks/records", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setContent("");
    setTitle("");

    useRouter().reload();
  };

  return (
    <>
      <form onSubmit={createCardHandler}>
        <div className={styles.form}>
          <h3 className={styles.title}>Create a new note</h3>

          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.btn}>Create note</button>
        </div>
      </form>
    </>
  );
}
