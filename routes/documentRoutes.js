const express = require('express');
const { uploadDocument, approveDocument, getDocuments } = require('../controllers/documentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware, roleMiddleware('RoleA'), uploadDocument);
router.put('/approve/:id', authMiddleware, roleMiddleware('RoleB'), approveDocument);
router.get('/', authMiddleware, getDocuments);

module.exports = router;
