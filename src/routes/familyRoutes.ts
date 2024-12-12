import express from 'express';
import { createFamilySchema, addUserToFamilySchema, idParamSchema, updateFamilySchema } from '../utils/validation';
import { createFamily, addUserToFamily, getAllFamilies, getFamilyById } from '../services/familyService';
import { ZodError } from 'zod';

const familyRouter = express.Router();

familyRouter.post('/family', async (req, res) => {
  try {
    const data = createFamilySchema.parse(req.body);
    const family = await createFamily(data);
    res.status(201).json(family);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err?.message ?? 'Error registering family' });
  }
});

familyRouter.put('/family/:id', async (req, res) => {
  try {
    const { id } = idParamSchema('id').parse(req.params);

    const data = updateFamilySchema.parse(req.body);

    const family = await getFamilyById(id);

    if(!family) {
      res.status(404).json({ error: "Family not found"});
      return;
    }

    const updatedFamily = await family.update(data);
    res.status(200).json(updatedFamily);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err?.message ?? 'Error updating family' });
  }
});

familyRouter.post('/family/:family_id/users', async (req, res) => {
  try {
    const { family_id } = idParamSchema('family_id').parse(req.params);

    const { user_id } = addUserToFamilySchema.parse(req.body);

    const result = await addUserToFamily(family_id, user_id);
    res.status(201).json(result);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return
    }
    res.status(500).json({ error: err?.message ?? "Error adding user to family" });
  }
});

familyRouter.get('/family', async (_req, res) => {
  try {
    const families = await getAllFamilies();
    res.status(200).json(families);
  } catch (err: any) {
    res.status(404).json({ error: err?.message ?? "Error fetching families" });
  }
});

familyRouter.get('/family/:id', async (req, res) => {
  try {
    const { id } = idParamSchema('id').parse(req.params);
    
    const family = await getFamilyById(id);

    if(!family) {
      res.status(404).json({ error: "Family not found"});
      return;
    }
    res.status(200).json(family);
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? "Error searching for this family" });
  }
});

export default familyRouter;
