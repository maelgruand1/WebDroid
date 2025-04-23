import { db } from './Classes/firebase';
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './styles/TextEditor.css';

interface Note {
  id: string;
  content: string;
  updatedAt: Timestamp;
}

const TextEditor = () => {
  const [text, setText] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "notes"), {
        content: text,
        updatedAt: new Date()
      });
      setText('');
      fetchNotes(); // refresh après sauvegarde
      alert("Note enregistrée !");
    } catch (err) {
      console.error("Erreur d'enregistrement : ", err);
      alert("Échec de l'enregistrement.");
    }
  };

  const fetchNotes = async () => {
    const q = query(collection(db, "notes"), orderBy("updatedAt", "desc"));
    const querySnapshot = await getDocs(q);
    const notesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Note, 'id'>)
    }));
    setNotes(notesData);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="editor-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écris ta note ici..."
      />
      <button onClick={handleSave}>💾 Enregistrer</button>

      <div className="notes-history">
        <h3>📜 Historique des notes</h3>
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <div className="note-preview">
                <div className="note-content">{note.content.slice(0, 50)}...</div>
                <div className="note-date">{note.updatedAt.toDate().toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextEditor;
