import mongoose from "mongoose";
import NoteModel from "../models/note.model.js";
import createHttpError from "http-errors";

export const getNotes = async (req, res, next) => {
  const authenticatedUserId = req.userId;
  try {
    const notes = await NoteModel.find({ userId: authenticatedUserId }).sort({
      updatedAt: -1,
    });
    if (!notes) {
      throw createHttpError(404, "Notes not found");
    }
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  const authenticatedUserId = req.userId;

  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(id);
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You are not authorized to access this page");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  const authenticatedUserId = req.userId;

  try {
    const { title, body } = req.body;

    if (!title) {
      throw createHttpError(400, "Title is required");
    }

    const note = await NoteModel.create({
      userId: authenticatedUserId,
      title,
      body,
    });
    if (!note) {
      throw createHttpError(400, "Failed to create note");
    }
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
	const authenticatedUserId = req.userId;

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid note id");
    }

    const checkId = await NoteModel.findById(id);

    if (!checkId) {
      throw createHttpError(404, "Note not found");
    }

    if (!checkId.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "You are not authorized to access this page");
    }

    const { title, body } = req.body;

    const note = await NoteModel.findByIdAndUpdate(
      id,
      { title, body },
      { new: true },
    );

    if (!note) {
      throw createHttpError(400, "Failed to update note");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
	const authenticatedUserId = req.userId;

  if (!mongoose.isValidObjectId(id)) {
    throw createHttpError(400, "Invalid note id");
  }

  const checkId = await NoteModel.findById(id);

  if (!checkId) {
    throw createHttpError(404, "Note not found");
  }

  if (!checkId.userId.equals(authenticatedUserId)) {
    throw createHttpError(401, "You are not authorized to access this page");
  }


  const note = await NoteModel.findByIdAndDelete(id);

  if (!note) {
    throw createHttpError(404, "Note not found");
  }
  res.status(200).json({ message: "Note deleted successfully" });
};
