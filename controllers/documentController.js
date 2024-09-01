const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
  try {
    const document = new Document({
      uploadedBy: req.user.id,
      content: req.body.content
    });

    await document.save();
    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.approveDocument = async (req, res) => {
  // console.log(req.user);
  try {
    // console.log(req.params.id);
    const document = await Document.findById(req.params.id);
    // console.log(document);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.status === 'Approved') return res.status(400).json({ message: 'Document already approved' });

    document.status = 'Approved';
    document.approvedBy = req.user.id;
    await document.save();

    res.status(200).json({ message: 'Document approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    // console.log(req.user);
    const documents = await Document.find().populate('uploadedBy', 'username').populate('approvedBy', 'username');
    // console.log(documents);
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
