import { ZodError } from 'zod';
import express from 'express'
import { addPhotoToAlbumSchema, createAlbumSchema, idParamSchema, updateAlbumSchema } from '../utils/validation';
import { addPhotoToAlbum, createAlbum, getAlbumById, getAllAlbums, removePhotoFromAlbum } from '../services/albumService';
import { getUserById } from '../services/userService';
import { getFamilyById, isUserInFamily } from '../services/familyService';
import { getPhotoById } from '../services/photoServices';

const albumRouter = express.Router();

albumRouter.post('/album', async (req, res) => {
  try {
    const validatedData = createAlbumSchema.parse(req.body);

    const { family_id, created_by } = validatedData;

    const existingUser = await getUserById(created_by);

    if(!existingUser) {
      throw new Error('User not found')
    }

    const existingFamily = await getFamilyById(family_id);

    if(!existingFamily) {
      throw new Error('Family not found')
    }

    const album = await createAlbum(validatedData);
    res.status(201).json(album);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(400).json({ error: err.message });
  }
});

albumRouter.put('/album/:id', async (req, res) => {
  try {
    const { id } = idParamSchema('id').parse(req.params);

    const data = updateAlbumSchema.parse(req.body);

    const album = await getAlbumById(id);

    if(!album) {
      res.status(404).json({ error: "Album not found"});
      return;
    }

    const updatedFamily = await album.update(data);
    res.status(200).json(updatedFamily);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err?.message ?? 'Error updating album' });
  }
});

albumRouter.get('/album', async (req, res) => {
  try {
    const albums = await getAllAlbums();
    res.status(200).json(albums);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? 'Error fetching albums' });
  }
});


albumRouter.get('/album/:id', async (req, res) => {
  try {
    const { id } = idParamSchema('id').parse(req.params);
    const album = await getAlbumById(id); 

    if(!album) {
      res.status(404).json({ error: "Album not found"});
      return;
    }

    res.status(200).json(album);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err?.message ?? 'Error fetching album' });
  }
});

albumRouter.post('/album/:albumId/photo/:photoId', async (req, res) => {
  try {
    const { albumId } = idParamSchema('albumId').parse(req.params);
    const { photoId } = idParamSchema('photoId').parse(req.params);
    const { description } = addPhotoToAlbumSchema.parse(req.body);

    const album = await getAlbumById(albumId); 

    if(!album) {
      res.status(404).json({ error: "Album not found"});
      return;
    }

    const photo = await getPhotoById(photoId); 

    if(!photo) {
      res.status(404).json({ error: "Photo not found"});
      return;
    }

    const photoOwnerId = photo.getDataValue('user_id');
    const albumFamilyId = album.getDataValue('family_id');
    
    const isUserPartOfFamily = await isUserInFamily(photoOwnerId, albumFamilyId);

    if (!isUserPartOfFamily) {
      res.status(403).json({ error: "Photo owner does not belong to the album's family." });
      return;
    }

    const result = await addPhotoToAlbum(albumId, photoId, description);
    res.status(201).json(result);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return;
    }
    res.status(500).json({ error: err.message });
  }
});

albumRouter.delete('/album/:albumId/photo/:photoId', async (req, res) => {
  try {
    const { albumId } = idParamSchema('albumId').parse(req.params);
    const { photoId } = idParamSchema('photoId').parse(req.params);

    const album = await getAlbumById(albumId); 

    if(!album) {
      res.status(404).json({ error: "Album not found"});
      return;
    }

    const photo = await getPhotoById(photoId); 

    if(!photo) {
      res.status(404).json({ error: "Photo not found"});
      return;
    }

    await removePhotoFromAlbum(albumId, photoId);

    res.status(200).json({ message: 'Photo removed from album successfully' });
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return;
    }
    res.status(500).json({ error: err.message });
  }
});

export default albumRouter;