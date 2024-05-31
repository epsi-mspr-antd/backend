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

    const filename = `${uuidv4()}${path.extname(file.originalname)}`;

    fs.writeFileSync(path.join(this.getUploadPath(), filename), file.buffer);

    return filename;
  }

  async delete(filename: string): Promise<void> {
    const filePath = path.join(this.getUploadPath(), filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  private getUploadPath(): string {
    return process.env.NODE_ENV === 'production'
      ? '/app/static'
      : path.join(__dirname, '../../..', 'static');
  }
}
