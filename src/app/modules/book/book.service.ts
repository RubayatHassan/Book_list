import { Book, Prisma, PrismaClient } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { BookSearchAbleFields } from "./book.contants";
import { IBookFilterRequest } from "./book.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (filters: IBookFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
   

    const andConditons = [];


    if (searchTerm) {
        andConditons.push({
            OR: BookSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })

    }

    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }


    const whereConditons: Prisma.BookWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.book.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createdAt: 'desc'
            }
    });
const total = await prisma.book.count();

    return {
        meta: {
            total,
            page,
            limit
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