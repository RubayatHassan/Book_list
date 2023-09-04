import { Category, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: Category): Promise<Category> => {
    const result = await prisma.category.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (): Promise<IGenericResponse<Category[]>> => {

    const result = await prisma.category.findMany();

const total = await prisma.category.count();

    return {
        meta: {
            total,
            page: 1,
            limit: 2
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