import { Router } from 'express';
import { uploadPhoto } from '../middlewares/uploadPhoto';
import { createPhoto, getPhotosByUserId, deletePhoto, getPhotoById } from '../services/photoServices';
import { idParamSchema } from '../utils/validation';
import { ZodError } from 'zod';
import { getUserById } from '../services/userService';

const photoRouter = Router();

photoRouter.post('/upload/:userId', uploadPhoto.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No photo uploaded' });
      return;
    }

    const { userId } = idParamSchema('userId').parse(req.params);

    const photo = await createPhoto(userId, req.file);
    res.status(201).json(photo);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err.message });
  }
});

photoRouter.get('/photo/:userId/user', async (req, res) => {
  try {
    const { userId } = idParamSchema('userId').parse(req.params);

    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const photos = await getPhotosByUserId(userId);

    res.status(200).json(photos);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err.message });
  }
});

photoRouter.get('/photo/:id', async (req, res) => {
  try {
    const { id } = idParamSchema('id').parse(req.params);

    const photo = await getPhotoById(id);

    if(!photo) {
      res.status(404).json({ error: "Photo not found" });
      return;
    }

    res.status(200).json(photo);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err.message });
  }
});

photoRouter.delete('/photo/:photoId', async (req, res) => {
  try {
    const { photoId } = idParamSchema('photoId').parse(req.params);

    const existingPhoto = await getPhotoById(photoId);

    if(!existingPhoto) {
      res.status(404).json({ error: 'Photo not found' });
      return;
    }

    await deletePhoto(existingPhoto);
    
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err.message });
  }
});

export default photoRouter;
