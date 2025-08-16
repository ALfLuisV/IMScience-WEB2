import multer from "multer";
import { uuid } from 'uuidv4';

export default multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, 'images/profileImages');
        },
        filename: (req, file, cb) => {
            const filename = `${uuid()}_profilePic_${req.body.name + file.originalname}`;
            req.body.savedImageName = filename; // Salva o nome no objeto req para uso posterior
            cb(null, filename);
        },
        fileFilter: (_req, file, cb) => {
            if(!file) return cb(null, false);
            
            const isAcceptableFormat = ['image/png', 'image/jpg', 'image/jpeg'].find(format => format == file.mimetype);
            if (isAcceptableFormat) {
                return cb(null, true);
            }
            return cb(null, false);
        }
    }),
})
