import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';
import { BadRequestException } from '@nestjs/common';

// Esta função será chamada pelo `useFactory` no módulo
export const multerConfigFactory = (configService: ConfigService): MulterOptions => {
  // Lê o destino do .env, com um padrão de './public/uploads'
  const destination = configService.get<string>('MULTER_DEST', './public/uploads');
  console.log('Multer Destination (from factory):', destination)
  
  return {
    limits: {
      fileSize: +configService.get<number>('MULTER_MAX_SIZE', 5 * 1024 * 1024), // Padrão 5MB
    },

    // 2. Filtro de arquivos
    fileFilter: (req, file, callback) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        callback(null, true);
      } else {
        callback(
          new BadRequestException('Formato de arquivo inválido. Apenas imagens (jpg, jpeg, png, gif) são permitidas.'),
          false,
        );
      }
    },

    // 3. Storage (com nomes de arquivo customizados)
    storage: diskStorage({
      destination: destination, // Usa o destino do .env
      filename: (req, file, callback) => {
        const fileExtName = extname(file.originalname); // Pega a extensão
        const randomName = randomBytes(16).toString('hex'); // Gera nome aleatório
        callback(null, `${randomName}${fileExtName}`);
      },
    }),
  };
};