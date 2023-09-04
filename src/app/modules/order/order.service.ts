import { Order, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: Order): Promise<Order> => {
    const result = await prisma.order.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (): Promise<IGenericResponse<Order[]>> => {

    const result = await prisma.order.findMany();

const total = await prisma.order.count();

    return {
        meta: {
            total,
            page: 1,
            limit: 2
        },
        data: result
    }
}

const getByIdFromDB = async (id: string): Promise<Order | null> => {
    const result = await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            orderedBooks : true
            
        }
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<Order>): Promise<Order> => {
    const result = await prisma.order.update({
        where: {
            id
        },
        data: payload,
        include: {
            orderedBooks : true
            
        }
    });
    return result;
}

const deleteFromDB = async (id: string): Promise<Order> => {
    const result = await prisma.order.delete({
        where: {
            id
        },
        include: {
            orderedBooks : true
            
        }
    })
    return result;
}


export const OrderService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
}