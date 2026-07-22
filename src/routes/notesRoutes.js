import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRoutes = Router();

notesRoutes.use(authenticate);

notesRoutes.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

notesRoutes.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

notesRoutes.post('/notes', celebrate(createNoteSchema), createNote);

notesRoutes.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

notesRoutes.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

export default notesRoutes;
