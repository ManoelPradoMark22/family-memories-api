import fs from 'fs';
import path from 'path';
import Photo from '../models/Photo';
import { v4 as uuidv4 } from 'uuid';

const uploadPath = path.join(__dirname, '..', 'uploads', 'photos');

export const createPhoto = async (userId: number, file: Express.Multer.File) => {
  try {
    const fileName = `${uuidv4()}-${file.originalname}`;
    
    const filePath = path.join(uploadPath, fileName);

    fs.renameSync(file.path, filePath);

    const photo = await Photo.create({
      user_id: userId,
      url: `/uploads/photos/${fileName}`,
    });

    return photo;
  } catch (err: any) {
    throw new Error('Error uploading photo');
  }
};

export const getPhotoById = async (id: number) => {
  const album = await Photo.findByPk(id);
  return album;
};

export const getPhotosByUserId = async (userId: number) => {
  try {
    const photos = await Photo.findAll({
      where: {
        user_id: userId,
      },
    });
    return photos;
  } catch (err: any) {
    throw new Error('Error retrieving photos');
  }
};

export const deletePhoto = async (photoId: number) => {
  try {
    const photo = await Photo.findByPk(photoId);
    
    if (!photo) {
      throw new Error('Photo not found');
    }

    const filePath = path.join(__dirname, '..', 'uploads', 'photos', path.basename(photo.getDataValue('url')));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await photo.destroy();

    return true;
  } catch (err: any) {
    throw new Error('Error deleting photo');
  }
};
