const express = require('express');
const route = express.Router();
const Note = require('../models/notes');  // Assuming you have a Note model defined

// Get all notes
route.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        if(!notes || notes.length === 0){
            return res.status(404).json({ message: 'No notes found' });
        }
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message:error.message });
    }
});

// Get a single note by ID
route.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ message:'Error fetching note:'});
    }
});

// Create a new note
route.post('/', async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update a note by ID
route.patch('/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content
            },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Error updating note' });
    }
});

// Delete a note by ID
route.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Error deleting note' });
    }
});

module.exports = route;
