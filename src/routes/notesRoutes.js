import { Router } from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const notesRoutes = Router();

notesRoutes.get('/notes', getAllNotes);

notesRoutes.get('/notes/:noteId', getNoteById);

notesRoutes.post('/notes', createNote);

notesRoutes.patch('/notes/:noteId', updateNote);

notesRoutes.delete('/notes/:noteId', deleteNote);

export default notesRoutes;
