import { Response, Request } from "express";
import {
  createReview,
  findReviewById,
  listReviews,
  updateReview,
  deleteReview
} from "../entity/Review";
import { customPayloadResponse } from "../utils/auth";
import { validateFields } from "../utils";

export const handleCreateReview = async (req: Request, res: Response) => {
  try {
    const {  date, comments, issues, rating, location } = req.body;

    const validationError = validateFields({ date, rating, location });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const newReview = await createReview(date, comments, issues, rating, location);
    return res.status(200).json(customPayloadResponse(true, newReview)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleGetReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await listReviews();
    return res.status(200).json(customPayloadResponse(true, reviews)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleGetReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json(customPayloadResponse(false, "Id Required")).end();
    }

    const review = await findReviewById(parseInt(id));
    if (!review) {
      return res.status(200).json(customPayloadResponse(false, "Review Not Found")).end();
    }

    return res.status(200).json(customPayloadResponse(true, review)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleUpdateReview = async (req: Request, res: Response) => {
  try {
    const { id,date, comments, issues, rating, location } = req.body;

    const validationError = validateFields({ id, date, rating, location });
    if (validationError) {
      return res.status(200).json(customPayloadResponse(false, validationError)).end();
    }

    const review = await findReviewById(id);
    if (!review) {
      return res.status(200).json(customPayloadResponse(false, "Review Not Found")).end();
    }

    const updatedReview = await updateReview(id, date, comments, issues, rating, location);
    return res.status(200).json(customPayloadResponse(true, updatedReview)).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};

export const handleDeleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json(customPayloadResponse(false, "Id Required")).end();
    }

    await deleteReview(parseInt(id));
    return res.status(200).json(customPayloadResponse(true, "Review Deleted")).end();
  } catch (error) {
    console.error(error);
    return res.status(200).json(customPayloadResponse(false, "An Error Occurred")).end();
  }
};
