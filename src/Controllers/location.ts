import { Response, Request } from "express";
import {
  Location,
  findLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
  listLocations
} from "../entity/Location";
import { customPayloadResponse } from "../utils/auth";
import { validateFields } from "../utils";

export const handleCreateLocation = async (req: Request, res: Response) => {
  try {
    const { title, lat, lng, icon } = req.body;

    const validationError = validateFields({ title, lat, lng });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const newLocation = await createLocation(title, parseFloat(lat), parseFloat(lng), icon);
    return res.status(200).json(customPayloadResponse(true, newLocation)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleGetLocations = async (req: Request, res: Response) => {
  try {
    const locations = await listLocations();
    return res.status(200).json(customPayloadResponse(true, locations)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleGetLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json(customPayloadResponse(false, "Id Required")).end();
    }

    const location = await findLocationById(parseInt(id));
    if (!location) {
      return res.status(200).json(customPayloadResponse(false, "Location Not Found")).end();
    }

    return res.status(200).json(customPayloadResponse(true, location)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleUpdateLocation = async (req: Request, res: Response) => {
  try {
    const { id, title, lat, lng, icon } = req.body;

    const validationError = validateFields({ id, title, lat, lng });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const location = await findLocationById(id);
    if (!location) {
      return res.status(200).json(customPayloadResponse(false, "Location Not Found")).end();
    }

    const updatedLocation = await updateLocation(id, title, parseFloat(lat), parseFloat(lng), icon);
    return res.status(200).json(customPayloadResponse(true, updatedLocation)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleDeleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json(customPayloadResponse(false, "Id Required")).end();
    }

    await deleteLocation(parseInt(id));
    return res.status(200).json(customPayloadResponse(true, "Location Deleted")).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};
