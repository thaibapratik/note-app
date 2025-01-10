import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
	  userId: { type: mongoose.Types.ObjectId, required: true },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
