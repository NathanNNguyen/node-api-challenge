const express = require('express');
const Projects = require('./helpers/projectModel');
const Actions = require('./helpers/actionModel');
const router = express.Router();
const { logger, validateProject, validateProjectId, validateAction } = require('./middleware');

router.get('/:id', logger, validateProjectId, (req, res) => {
  const project = req.project
  res.status(200).json(project)
})

router.get('/:id/actions', logger, validateProjectId, async (req, res) => {
  const { id } = req.params;
  const actions = await Projects.getProjectActions(id)
  try {
    res.status(200).json(actions)
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

// action post
router.post('/:projectID/actions', logger, validateProjectId, validateAction, async (req, res) => {
  const { projectID } = req.params;
  const action = req.body;
  try {
    const inserted = await Actions.insert({ ...action, project_id: projectID })
    res.status(200).json(inserted)
  } catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
})

module.exports = router;