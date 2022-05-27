const express = require('express');
//const ejs = require('ejs');
const path = require('path');
const multer = require('multer');


// Inicialization
const app = express();

// Settings
app.set('port', 3000)

//middlewares
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination:path.join(__dirname,'./public/uploads/'),
});

const upload = multer({
    storage: storage,
    dest: path.join(__dirname,'./public/uploads/'),
    //limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        if(mimeType && extName){
            return cb(null, true);
        }
        cb('Error: Archivo no válido');
    }
}).single('image')
app.use(upload);

// routes
app.use(require('./routes/index.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen( app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});