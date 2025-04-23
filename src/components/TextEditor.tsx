import React, { useState } from 'react';
import './styles/TextEditor.css';

function TextEditor() {
  const [text, setText] = useState('');

  return (
    <div className="text-editor">
      <h1 className="App-title">Ven (Text Editor)</h1>
      <textarea
        className="editor-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écris ici..."
      />
    </div>
  );
}

export default TextEditor;
