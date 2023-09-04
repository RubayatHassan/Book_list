import { Order } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.insertIntoDB(req.body); 
    sendResponse<Order>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order Created!!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {


    const result = await OrderService.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order data fetched!!",
        meta: result.meta,
        data: result.data
    })
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OrderService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await OrderService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order updated successfully',
        data: result
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OrderService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'order deleted successfully',
        data: result
    });
})

export const OrderController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB

};
