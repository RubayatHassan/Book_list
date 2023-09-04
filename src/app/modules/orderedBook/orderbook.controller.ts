import { OrderedBook } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderedBookService } from "./orderbook.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderedBookService.insertIntoDB(req.body); 
    sendResponse<OrderedBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order Books Created!!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {


    const result = await OrderedBookService.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order Books data fetched!!",
        meta: result.meta,
        data: result.data
    })
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OrderedBookService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order Books fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await OrderedBookService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order Book list updated successfully',
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OrderedBookService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order Book list deleted successfully',
        data: result
    });
})

export const OrderBookController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB

};
