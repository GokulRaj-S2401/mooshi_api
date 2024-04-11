const fileModel = require('../Models/fileModel');

exports.uploadFile = async (req, res) => {
  try {
    const { filename, base64 } = req.body;
    
    // Upload the file and get the file path
    const filePath = await fileModel.uploadFile(filename, base64);
    
    // Save file details to the database
    const fileId = await fileModel.saveFileDetails(filename);
    
    res.status(201).json({ id: fileId, message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


exports.getFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await fileModel.getFileById(id);
    if (!file) {
      return res.status(404).send('File not found');
    }
    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
