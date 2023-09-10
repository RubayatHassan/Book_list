import { Category } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { UserFilterAbleFileds } from "../user/user.contants";
import { CategoryService } from "./category.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.insertIntoDB(req.body); 
    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "category book Created!!",
        data: result,
        
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, UserFilterAbleFileds);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);


    const result = await CategoryService.getAllFromDB(filters, options);
   
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category data fetched!!",
        meta: result.meta,
        data: result.data
    })
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await CategoryService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
        data: result
    });
})


export const CategoryController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB

};
