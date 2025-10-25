import { ConfigService } from '@nestjs/config'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { randomBytes } from 'crypto'
import { BadRequestException } from '@nestjs/common'

export const multerConfigFactory = (
  configService: ConfigService,
): MulterOptions => {
  const destination = configService.get<string>(
    'MULTER_DEST',
    './public/uploads',
  )
  return {
    limits: {
      fileSize: +configService.get<number>('MULTER_MAX_SIZE', 5 * 1024 * 1024),
    },

    fileFilter: (req, file, callback) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        callback(null, true)
      } else {
        callback(
          new BadRequestException(
            'Formato de arquivo inválido. Apenas imagens (jpg, jpeg, png, gif) são permitidas.',
          ),
          false,
        )
      }
    },

    storage: diskStorage({
      destination: destination,
      filename: (req, file, callback) => {
        const fileExtName = extname(file.originalname)
        const randomName = randomBytes(16).toString('hex')
        callback(null, `${randomName}${fileExtName}`)
      },
    }),
  }
}
