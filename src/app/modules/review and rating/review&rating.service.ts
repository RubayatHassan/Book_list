import { PrismaClient, ReviewAndRating } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: ReviewAndRating): Promise<ReviewAndRating> => {
    const result = await prisma.reviewAndRating.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (): Promise<IGenericResponse<ReviewAndRating[]>> => {

    const result = await prisma.reviewAndRating.findMany();

const total = await prisma.reviewAndRating.count();

    return {
        meta: {
            total,
            page: 1,
            limit: 2
        },
        data: result
    }
}

const getByIdFromDB = async (id: string): Promise<ReviewAndRating | null> => {
    const result = await prisma.reviewAndRating.findUnique({
        where: {
            id
        },
        include: {
            users : true,
            books : true

            
        }
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<ReviewAndRating>): Promise<ReviewAndRating> => {
    const result = await prisma.reviewAndRating.update({
        where: {
            id
        },
        data: payload,
        include: {
            users : true,
            books : true
        }
    });
    return result;
}

const deleteFromDB = async (id: string): Promise<ReviewAndRating> => {
    const result = await prisma.reviewAndRating.delete({
        where: {
            id
        },
        include: {
            users : true,
            books : true
        }
    })
    return result;
}


export const ReviewsAndRatingsService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
}