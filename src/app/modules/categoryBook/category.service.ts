import { Category, Prisma, PrismaClient } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { CategorySearchAbleFields } from "./category.contants";
import { ICategoryFilterRequest } from "./category.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: Category): Promise<Category> => {
    const result = await prisma.category.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (filters: ICategoryFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
   

    const andConditons = [];


    if (searchTerm) {
        andConditons.push({
            OR: CategorySearchAbleFields.map((field) => ({
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


    const whereConditons: Prisma.CategoryWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.category.findMany({
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
const total = await prisma.user.count();

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}




const getByIdFromDB = async (id: string): Promise<Category | null> => {
    const result = await prisma.category.findUnique({
        where: {
            id
        },
        include: {
            books : true
            
        }
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<Category>): Promise<Category> => {
    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload,
        include: {
            books : true
        }
    });
    return result;
}

const deleteFromDB = async (id: string): Promise<Category> => {
    const result = await prisma.category.delete({
        where: {
            id
        },
        include: {
            books : true,
        }
    })
    return result;
}





export const CategoryService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB

}