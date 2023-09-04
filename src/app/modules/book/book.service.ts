import { Book, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (): Promise<IGenericResponse<Book[]>> => {

    const result = await prisma.book.findMany();

const total = await prisma.book.count();

    return {
        meta: {
            total,
            page: 1,
            limit: 2
        },
        data: result
    }
}


const getByIdFromDB = async (id: string): Promise<Book | null> => {
    const result = await prisma.book.findUnique({
        where: {
            id
        },
        include: {
            reviewsAndRatings : true,
            orderedBooks : true
            
        }
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<Book>): Promise<Book> => {
    const result = await prisma.book.update({
        where: {
            id
        },
        data: payload,
        include: {
            reviewsAndRatings : true,
            orderedBooks : true
        }
    });
    return result;
}

const deleteFromDB = async (id: string): Promise<Book> => {
    const result = await prisma.book.delete({
        where: {
            id
        },
        include: {
            reviewsAndRatings : true,
            orderedBooks : true
        }
    })
    return result;
}


export const BookService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
}