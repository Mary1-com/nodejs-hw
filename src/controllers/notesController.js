import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search = '' } = req.query;
  const { _id: userId } = req.user;

  const currentPage = Number(page);
  const limit = Number(perPage);
  const skip = (currentPage - 1) * limit;

  const filter = {
    userId,
  };

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter).skip(skip).limit(limit),
    Note.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalNotes / limit);

  res.status(200).json({
    page: currentPage,
    perPage: limit,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const { _id: userId } = req.user;

  const note = await Note.findOne({
    _id: noteId,
    userId,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const { _id: userId } = req.user;

  const note = await Note.create({
    ...req.body,
    userId,
  });

  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { _id: userId } = req.user;

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId,
    },
    req.body,
    {
      returnDocument: 'after',
    },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const { _id: userId } = req.user;

  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId,
  });
  
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
