import { db } from './Classes/firebase';
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import { User } from './Classes/User';
import React, { useEffect, useState, useCallback } from 'react';
import './styles/TextEditor.css';

interface Note {
  id: string;
  content: string;
  updatedAt: Timestamp;
  userId: string; // Ajouter l'utilisateur associé à la note
}

interface TextEditorProps {
  user: User; // Recevoir l'utilisateur en prop
}

const TextEditor: React.FC<TextEditorProps> = ({ user }) => {
  const [text, setText] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (!user) {
      alert("Veuillez vous connecter avant de sauvegarder une note.");
      return;
    }

    try {
      setLoading(true); // Commencer le chargement
      await addDoc(collection(db, "notes"), {
        content: text,
        updatedAt: Timestamp.fromDate(new Date()), // Utiliser Timestamp de Firestore
        userId: user.id // Ajouter l'id de l'utilisateur
      });
      setText(''); // Réinitialiser le texte après sauvegarde
      fetchNotes(); // Rafraîchir après sauvegarde
      alert("Note saved successfuly !");
    } catch (err) {
      console.error("Saving error : ", err);
      alert("Saving error.");
    } finally {
      setLoading(false); // Fin du chargement
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
      // Filtrer les notes par utilisateur
      setNotes(notesData.filter(note => note.userId === user.id));
    } catch (err) {
      console.error("Error throw recuperation of notes : ", err);
      alert("Error of publication");
    }
  }, [user.id]);

  useEffect(() => {
    fetchNotes(); // Appeler fetchNotes une seule fois au montage
  }, [fetchNotes]);

  return (
    <div className="editor-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your note here ..."
        disabled={loading}
      />
      <button onClick={handleSave} disabled={loading}>💾 Save</button>

      <div className="notes-history">
        <h3>📜 Notes History </h3>
        <ul>
          {notes.length === 0 ? (
            <li>No notes availaible</li>
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
