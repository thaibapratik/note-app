import React, { useEffect } from "react";
import { deleteNote, getNotes } from "../network/NoteApi.js";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Notes from "../components/Notes.jsx";
import DeleteFailedToast from "../components/DeleteFailedToast.jsx";

const NotesPage = ({ notes, setNotes, loggedInUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/signup");
      return;
    }

    async function fetchData() {
      try {
        const response = await getNotes();
        setNotes(response);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }

    fetchData();
  }, [loggedInUser, navigate, setNotes]);

  const handleDeleteButton = async (id) => {
    try {
      const response = await deleteNote(id);

      if (!response.ok) {
        throw new Error("Error occurred while deleting note");
      }

      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.filter((note) => note._id !== id);
        return updatedNotes;
      });
    } catch (error) {
      console.error("Delete failed:", error.message);

    }
  };


  return (
      <div>
        {loggedInUser && loggedInUser.username && (
            <h5 className="signed-in-as">{loggedInUser.username} workspace:</h5>

        )}
        <Link to="/create">
          <Button className="add-btn">Add note</Button>
        </Link>
        <div className="card-container">
          {notes && notes.length > 0 ? (
              notes.map((note) => (
                  <Notes key={note._id} note={note} handleDeleteButton={handleDeleteButton} />
              ))
          ) : (
              <p className="no-note">No notes available. <Link to="/create">Add note</Link></p>
          )}
        </div>
      </div>
  );
};

export default NotesPage;
