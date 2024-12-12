import Album from '../models/Album';
import AlbumPhoto from '../models/AlbumPhoto';
import Photo from '../models/Photo';
import { AlbumCreationAttributes } from '../models/types';

export const createAlbum = async (data: any) => {
  const createAlbum = await Album.create(data);
  return createAlbum;
};

export const updatealbum = async (id: number, updateData: Partial<AlbumCreationAttributes>) => {
  const album = await Album.findByPk(id);
  if (!album) {
    throw new Error('Album not found')
  }

  return await album.update(updateData);
};

export const getAllAlbums = async () => {
  const albums = await Album.findAll({ include: Photo });
  return albums;
};

export const getAlbumById = async (id: number) => {
  const album = await Album.findByPk(id, { include: Photo });
  return album;
};

export const addPhotoToAlbum = async (albumId: number, photoId: number, description?: string) => {
  const existing = await AlbumPhoto.findOne({ where: { album_id: albumId, photo_id: photoId } });
  if (existing) {
    throw new Error('Photo already added to this album');
  }
  return AlbumPhoto.create({ album_id: albumId, photo_id: photoId, description });
};

export const removePhotoFromAlbum = async (albumId: number, photoId: number) => {
  const association = await AlbumPhoto.findOne({
    where: { album_id: albumId, photo_id: photoId },
  });

  if (!association) {
    throw new Error('Photo not found in the album');
  }

  await association.destroy();
};
