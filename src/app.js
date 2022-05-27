import express from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Import routes
import alumnosRoutes from "./routes/alumnos.routes.js";
import profesoresRoutes from "./routes/profesores.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(                //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);

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
      console.log(file.originalname)
      if(mimeType && extName){
          return cb(null, true);
      }
      cb('Error: Archivo no válido');
  }
}).single('image')
app.use(upload);


// Routes
app.use("/alumnos", alumnosRoutes);
app.use("/profesores", profesoresRoutes);

export default app;
