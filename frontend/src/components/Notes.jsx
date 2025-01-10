
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import {Link} from "react-router-dom";

const Notes = ({ note, handleDeleteButton }) => {

    let date = format(new Date(note.updatedAt), "M/d/yy");

    return (
    <div className="note-card">
      <MdDelete
        size={25}
        className="delete-icon"
        onClick={(e) => {
            e.stopPropagation();
            handleDeleteButton(note._id)
        }}
      />

        <Link to={`/${note._id}`}>
            <div>
                <h5>{note.title}</h5>
            </div>
            <div className="text-muted">
                {date} <span>{note.body}</span>
            </div>
        </Link>
    </div>
  );
};

export default Notes;
