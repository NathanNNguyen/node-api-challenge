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
  if (!project) {
    res.status(404).json({ message: 'Invalid id' })
  } else {
    next()
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
  if (!action) {
    res.status(404).json({ message: 'Invalid id' })
  } else {
    next();
  }
}

exports.validateAction = (req, res, next) => {
  const action = req.body;
  if (!action) {
    res.status(400).json({ message: 'Missing data' })
  } else if (!action.description || !action.notes || !action.project_id) {
    res.status(400).json({ message: 'Missing required field or project_id does not exist' })
  } else {
    next()
  }
}