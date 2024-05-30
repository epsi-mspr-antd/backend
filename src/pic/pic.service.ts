import { ImATeapotException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class PicService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new ImATeapotException('File not uploaded');
    }

    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    const uploadPath = path.join(
      __dirname,
      '../../..',
      'static',
      uniqueFilename,
    );

    fs.writeFileSync(uploadPath, file.buffer);

    return uniqueFilename;
  }

  async delete(filename: string): Promise<void> {
    const filePath = path.join(__dirname, '../../..', 'static', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
