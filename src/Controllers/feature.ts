import { Response, Request } from "express";
import {
  createFeature,
  findFeatureById,
  listFeatures,
  updateFeature,
  deleteFeature
} from "../entity/Feature";
import { customPayloadResponse } from "../utils/auth";
import { validateFields } from "../utils";

export const handleCreateFeature = async (req: Request, res: Response) => {
  try {
    const { geometry, FID, name, type } = req.body;

    const validationError = validateFields({ geometry, name, type });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const newFeature = await createFeature(geometry, FID, name, type);
    return res.status(200).json(customPayloadResponse(true, newFeature)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleGetFeatures = async (req: Request, res: Response) => {
  try {
    const features = await listFeatures();
    return res.status(200).json(customPayloadResponse(true, features)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleGetFeature = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json(customPayloadResponse(false, "Id Required")).end();
    }

    const feature = await findFeatureById(parseInt(id));
    if (!feature) {
      return res.status(200).json(customPayloadResponse(false, "Feature Not Found")).end();
    }

    return res.status(200).json(customPayloadResponse(true, feature)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleUpdateFeature = async (req: Request, res: Response) => {
  try {
    const { id, geometry, FID, name, type } = req.body;

    const validationError = validateFields({ id, geometry, name, type });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const feature = await findFeatureById(id);
    if (!feature) {
      return res.status(200).json(customPayloadResponse(false, "Feature Not Found")).end();
    }

    const updatedFeature = await updateFeature(id, geometry, FID, name, type);
    return res.status(200).json(customPayloadResponse(true, updatedFeature)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleDeleteFeature = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json(customPayloadResponse(false, "Id Required")).end();
    }

    await deleteFeature(parseInt(id));
    return res.status(200).json(customPayloadResponse(true, "Feature Deleted")).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};
