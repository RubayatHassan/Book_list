import { OrderedBook, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: OrderedBook): Promise<OrderedBook> => {
    const result = await prisma.orderedBook.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (): Promise<IGenericResponse<OrderedBook[]>> => {

    const result = await prisma.orderedBook.findMany();

const total = await prisma.orderedBook.count();

    return {
        meta: {
            total,
            page: 1,
            limit: 2
        },
        data: result
    }
}

const getByIdFromDB = async (id: string): Promise<OrderedBook | null> => {
    const result = await prisma.orderedBook.findUnique({
        where: {
            id
        },
        
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<OrderedBook>): Promise<OrderedBook> => {
    const result = await prisma.orderedBook.update({
        where: {
            id
        },
        data: payload,
        
    });
    return result;
}

const deleteFromDB = async (id: string): Promise<OrderedBook> => {
    const result = await prisma.orderedBook.delete({
        where: {
            id
        },
        
    })
    return result;
}


export const OrderedBookService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
}