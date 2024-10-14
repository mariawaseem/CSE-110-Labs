import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";

function App() {

  const [notes, setNotes] = useState(
    dummyNotesList.map(note => ({ ...note, fav: false}))
  );

  const initialNote = {
    id: -1,
    fav: false,
    title: "",
    content: "",
    label: Label.other,
  };

 const [createNote, setCreateNote] = useState(initialNote);
 const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
 
 const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([...notes, createNote]);
    setCreateNote(initialNote);
  };

  const [favs, setFavs] = useState<number[]>([]);

  const handleDelete = (noteID: number) => {
    setNotes(notes.filter((note => note.id !== noteID)));
  }

  const [hearts, setHearts] = useState(
    notes.map(note => '♡')
  );

  const favorite = (noteID: number) => {
    const updatedNotes = notes.map((note) => {
      if (noteID == note.id) {
        return { ...note, fav: !note.fav};
      }
      return note;
    });

    setNotes(updatedNotes);
    const favedNotes = updatedNotes.filter((note) => note.fav).map((note) => note.id);
    setFavs(favedNotes);
  }
  
  useEffect(() => {
    const newHearts = notes.map((note) => {
      if (note.fav == true) {
        return '❤️';
      }
      else {
        return '♡';
      }
    })
    setHearts(newHearts);
    }, [notes]);

 const theme = useContext(ThemeContext);

 return (
   <div className='app-container'
        style={{ background: theme.background, color: theme.foreground }}>
    <form className="note-form" 
          style={{ background: theme.background, color: theme.foreground }}
          onSubmit={createNoteHandler}>

      <div><input placeholder="Note Title"
                   onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })}required>
            </input>
      </div>

    	<div>
      	<textarea
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

      <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label })}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    <div><button type="submit">Create Note</button></div>

    </form>

    <div className="notes-grid" style={{ background: theme.background, color: theme.foreground }}>
       {notes.map((note) => (
         <div
           key={note.id}
           className="note-item"
           style={{ background: theme.background, color: theme.foreground }}>
           <div className="notes-header" style={{ background: theme.background, color: theme.foreground }}>
             <button onClick={() => favorite(note.id)} style={{ background: theme.background, color: theme.foreground }}>{hearts[note.id - 1]}</button>
             <button onClick={() => handleDelete(note.id)} style={{ background: theme.background, color: theme.foreground }}>x</button>
           </div>
           <h2 contentEditable="true"> {note.title} </h2>
           <p contentEditable="true">  {note.content} </p>
           <p contentEditable="true"> {note.label} </p>
         </div>
       ))}
     </div>
     <div className="favorites">
      <h2>List of favorites:</h2>
      <ul>
        {favs.map((noteID) => (
          <li key={noteID}>{notes.find((note) => note.id === +noteID)?.title}</li>
        ))}
      </ul>
     </div>
   </div>
 );
}

function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
 
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };
 
  return (
    <ThemeContext.Provider value={currentTheme}>
      <App />
      <button onClick={toggleTheme}> Toggle Theme </button>
    </ThemeContext.Provider>
  );
 }
 
 export default ToggleTheme;