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

notesRoutes.get('/', celebrate(getAllNotesSchema), getAllNotes);

notesRoutes.get('/:noteId', celebrate(noteIdSchema), getNoteById);

notesRoutes.post('/', celebrate(createNoteSchema), createNote);

notesRoutes.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

notesRoutes.delete('/:noteId', celebrate(noteIdSchema), deleteNote);


export default notesRoutes;
