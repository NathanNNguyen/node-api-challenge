const express = require('express');
const Actions = require('./helpers/actionModel');
const router = express.Router();

const { logger, validateAction, validateActionId } = require('./middleware')

router.get('/:id', logger, validateActionId, async (req, res) => {
  const action = req.action
  res.status(200).json(action)
})

router.put('/:id', logger, validateActionId, validateAction, async (req, res) => {
  const { id } = req.params;
  const action = req.body;
  try {
    const updated = await Actions.update(id, action);
    res.status(200).json(updated);
  } catch{
    res.status(500).json({ message: 'Internal error' })
  }
})

router.delete('/:id', logger, validateActionId, async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Actions.remove(id)
    res.status(200).json(removed);
  } catch {
    res.status(500).json({ message: 'Internal error' })
  }
})

module.exports = router;