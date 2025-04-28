// src/TextEditor.tsx

import { db } from './Classes/firebase';
import { collection, addDoc, getDocs, Timestamp, query, orderBy, where } from 'firebase/firestore';
import { User } from './Classes/User';
import { System } from './Classes/System'; // 👉 Import System pour notifications
import React, { useEffect, useState, useCallback } from 'react';
import './styles/TextEditor.css';

interface Note {
  id: string;
  content: string;
  updatedAt: Timestamp;
  userId: string;
}

interface TextEditorProps {
  user: User;
}

const TextEditor: React.FC<TextEditorProps> = ({ user }) => {
  const [text, setText] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const q = query(
    collection(db, "notes"),
    where("userId", "==", user.id),
    orderBy("updatedAt", "desc")
  );

  const handleSave = async () => {
    if (!user) {
      alert("Veuillez vous connecter avant de sauvegarder une note.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "notes"), {
        content: text,
        updatedAt: Timestamp.fromDate(new Date()),
        userId: user.id
      });
      setText('');
      await fetchNotes();

      // ✅ Avant d'envoyer une notification, demander la permission :
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          await System.sendNotification("✅ Note Saved!", "Your note has been successfully saved.");
        } else {
          console.warn("Notifications not authorized, skipping notification.");
        }
      }
    } catch (err) {
      console.error("Saving error : ", err);
      alert("Saving error.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = useCallback(async () => {
    try {
      const q = query(collection(db, "notes"), orderBy("updatedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const notesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Note, 'id'>)
      }));
      setNotes(notesData.filter(note => note.userId === user.id));
    } catch (err) {
      console.error("Error retrieving notes: ", err);
      alert("Error fetching notes.");
    }
  }, [user.id]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="editor-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your note here..."
        disabled={loading}
      />
      <button onClick={handleSave} disabled={loading}>💾 Save</button>

      {/* 🔔 Bouton Test Notification placé au bon endroit */}
      <button
        onClick={async () => {
          if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              new Notification("🔔 Test Notification", { body: "It works!" });
            } else {
              alert("Notifications not authorized.");
            }
          } else {
            alert("Notifications not supported by this browser.");
          }
        }}
        disabled={loading}
      >
        🔔 Test Notification
      </button>

      <div className="notes-history">
        <h3>📜 Notes History</h3>
        <ul>
          {notes.length === 0 ? (
            <li>No notes available</li>
          ) : (
            notes.map(note => (
              <li key={note.id}>
                <div className="note-preview">
                  <div className="note-content">{note.content.slice(0, 50)}...</div>
                  <div className="note-date">{note.updatedAt.toDate().toLocaleString()}</div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TextEditor;
