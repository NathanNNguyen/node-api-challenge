// middleware
const Projects = require('../helpers/projectModel');
const Actions = require('../helpers/actionModel');

exports.logger = (req, res, next) => {
  const date = Date(Date.now())
  console.log(`${req.method} Request to ${req.originalUrl} on ${date}`)
  next();
}

exports.validateProjectId = async (req, res, next) => {
  const { id } = req.params;
  const project = await Projects.get(id);
  try {
    if (!project) {
      res.status(404).json({ message: 'Invalid id' })
    } else {
      req.project = project
    }
    next()
  } catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
}

exports.validateProject = (req, res, next) => {
  const project = req.body;
  if (!project) {
    res.status(400).json({ message: 'Missing data' })
  } else if (!project.name || !project.description) {
    res.status(400).json({ message: 'Missing required field' })
  } else {
    next()
  }
}

exports.validateActionId = async (req, res, next) => {
  const { id } = req.params;
  const action = await Actions.get(id);
  try {
    if (!action) {
      res.status(404).json({ message: 'Invalid id' })
    } else {
      req.action = action
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal error', err })
  }
}

exports.validateAction = (req, res, next) => {
  const action = req.body;
  if (!action) {
    res.status(400).json({ message: 'Missing data' })
  } else if (!action.description || !action.notes) {
    res.status(400).json({ message: 'Missing required field' })
  } else {
    next()
  }
}