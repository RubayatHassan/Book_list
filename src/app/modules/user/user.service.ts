import { PrismaClient, User } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: User): Promise<User> => {
    const result = await prisma.user.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (): Promise<IGenericResponse<User[]>> => {

    const result = await prisma.user.findMany();

const total = await prisma.user.count();

    return {
        meta: {
            total,
            page: 1,
            limit: 2
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
            reviewsAndRatings : true
            
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
            reviewsAndRatings : true
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