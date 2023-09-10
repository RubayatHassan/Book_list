import { Book } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { BookFilterAbleFileds } from "./book.contants";
import { BookService } from "./book.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.insertIntoDB(req.body); 
    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book Created!!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, BookFilterAbleFileds);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);


    const result = await BookService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book data fetched!!",
        meta: result.meta,
        data: result.data
    })
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await BookService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book updated successfully',
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book deleted successfully',
        data: result
    });
})

export const BookController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB

};
