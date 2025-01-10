import { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { createNote, updateNote } from "../network/NoteApi";
import {Button} from "react-bootstrap";

const AddEditNote = ({ notes, setNotes }) => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [noTitle, setNoTitle] = useState(false);


    useEffect(() => {
        if (id) {
            const noteToEdit = notes.find((note) => note._id === id);
            if (noteToEdit) {
                setTitle(noteToEdit.title);
                setBody(noteToEdit.body);
            }
        }
    }, [id, notes]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (title === "") {
            return setNoTitle(true);
        }

        if (id) {
            try {
                await updateNote(id, { title, body });
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note._id === id ? { ...note, title, body } : note
                    )
                );
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const newNote = await createNote({ title, body });
                setNotes((prevNotes) => [newNote, ...prevNotes]);
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <h5 className="warning">{noTitle && "Title is required"}</h5>
            <form onSubmit={onSubmit} id="addEditNote" className="addEditNote">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <Button onClick={onSubmit}>Save</Button>
            </form>
        </>
    );
};
export default AddEditNote;
