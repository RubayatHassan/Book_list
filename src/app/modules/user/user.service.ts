import { Prisma, PrismaClient, User } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { UserSearchAbleFields } from "./user.contants";
import { IUserFilterRequest } from "./user.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: User): Promise<User> => {
    const result = await prisma.user.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (

    filters: IUserFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
   

    const andConditons = [];


    if (searchTerm) {
        andConditons.push({
            OR: UserSearchAbleFields.map((field) => ({
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


    const whereConditons: Prisma.UserWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.user.findMany({
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

const getByIdFromDB = async (id: string): Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            reviewsAndRatings : true,
            orders : true
            
        }
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<User>): Promise<User> => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload,
        include: {
            reviewsAndRatings : true,
            orders : true
            
        }
    });
    return result;
}

const deleteFromDB = async (id: string): Promise<User> => {
    const result = await prisma.user.delete({
        where: {
            id
        },
        include: {
            reviewsAndRatings : true,
            orders : true
            
        }
    })
    return result;
}


export const UserService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
}