import { ReviewAndRating } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ReviewAndRatingFilterAbleFileds } from "./review&rating.contants";
import { ReviewsAndRatingsService } from "./review&rating.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewsAndRatingsService.insertIntoDB(req.body); 
    sendResponse<ReviewAndRating>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review & Rating Created!!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    
    const filters = pick(req.query, ReviewAndRatingFilterAbleFileds);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await ReviewsAndRatingsService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review & Rating data fetched!!",
        meta: result.meta,
        data: result.data
    })
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ReviewsAndRatingsService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review & Rating fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await ReviewsAndRatingsService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review & Rating updated successfully',
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ReviewsAndRatingsService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: result
    });
})

export const ReviewAndRatingController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB

};
