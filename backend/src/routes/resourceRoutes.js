const express = require('express');
const router = express.Router();

// Mock controller functions for now
router.get('/', (req, res) => {
    res.json([
        { id: '1', name: 'Dr. Sarah Wilson', type: 'HUMAN', status: 'AVAILABLE', department: 'Cardiology' },
        { id: '2', name: 'MRI Unit 1', type: 'MACHINE', status: 'OCCUPIED', department: 'Radiology' }
    ]);
});

router.post('/', (req, res) => {
    const resource = req.body;
    res.status(201).json({ message: 'Resource created', resource });
});

module.exports = router;
