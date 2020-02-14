const express = require('express');
const Projects = require('./helpers/projectModel');
const actionRouter = require('./actionRouter')
const router = express.Router();
const { logger, validateProject, validateProjectId } = require('./middleware');

router.use('/:id/actions', actionRouter);

router.get('/:id', logger, validateProjectId, async (req, res) => {
  const { id } = req.params;
  const project = await Projects.get(id);
  try {
    res.status(200).json(project)
  }
  catch {
    res.status(500).json({ message: 'Internal error' })
  }
})

router.get('/:id/actions', logger, validateProjectId, async (req, res) => {
  const { id } = req.params;
  const project = await Projects.getProjectActions(id)
  try {
    res.status(200).json({ project_id: id, ...project })
  } catch {
    res.status(500).json({ message: 'Internal error' })
  }
})

router.post('/', logger, validateProject, async (req, res) => {
  const project = req.body;
  try {
    const inserted = await Projects.insert(project)
    res.status(200).json(inserted)
  } catch{
    res.status(500).json({ message: 'Internal error' })
  }
})

router.delete('/:id', logger, validateProjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Projects.remove(id)
    res.status(200).json(removed)
  } catch {
    res.status(500).json({ message: 'Interrnal error' })
  }
})

router.put('/:id', logger, validateProjectId, validateProject, async (req, res) => {
  const { id } = req.params;
  const project = req.body
  try {
    const updated = await Projects.update(id, project)
    res.status(200).json(updated)
  } catch {
    res.status(500).json({ message: 'Internal error' })
  }
})

module.exports = router;