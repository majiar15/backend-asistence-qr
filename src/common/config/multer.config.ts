import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',  // Carpeta donde se almacenarán los archivos subidos
    filename: (req, file, cb) => {
      const fileExtName = extname(file.originalname);
      const fileName = `${Date.now()}${fileExtName}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /xlsx|xls/;
    const fileExtName = extname(file.originalname).toLowerCase();
    if (allowedTypes.test(fileExtName)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  },
};