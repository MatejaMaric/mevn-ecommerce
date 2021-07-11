const passport = require('passport');

const multer = require('multer');
const uuid = require('uuid');
const path = require('path');


const isAuth = passport.authenticate('jwt', {session: false});
const isAdmin = (req, res, next) => {
  if (!req.user.admin)
    res.status(401).json({status: "You need to be an administrator!"});
  else next();
}


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
});
const multerFileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg')
    cb(null, true);
  else
    cb(null, false);
};
const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: multerFileFilter
});


module.exports = {
  isAuth,
  isAdmin,
  upload
};
