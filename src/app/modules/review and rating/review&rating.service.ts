import { Prisma, PrismaClient, ReviewAndRating } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ReviewAndRatingSearchAbleFields } from "./review&rating.contants";
import { IReviewAndRattingFilterRequest } from "./review&rating.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (userData: ReviewAndRating): Promise<ReviewAndRating> => {
    const result = await prisma.reviewAndRating.create({
        data: userData
    });

    return result;
};

const getAllFromDB = async (filters: IReviewAndRattingFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<ReviewAndRating[]>> => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
   

    const andConditons = [];


    if (searchTerm) {
        andConditons.push({
            OR: ReviewAndRatingSearchAbleFields.map((field) => ({
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


    const whereConditons: Prisma.ReviewAndRatingWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.reviewAndRating.findMany({
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
const total = await prisma.reviewAndRating.count();

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getByIdFromDB = async (id: string): Promise<ReviewAndRating | null> => {
    const result = await prisma.reviewAndRating.findUnique({
        where: {
            id
        },
        
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<ReviewAndRating>): Promise<ReviewAndRating> => {
    const result = await prisma.reviewAndRating.update({
        where: {
            id
        },
        data: payload,
        
    });
    return result;
}

const deleteFromDB = async (id: string): Promise<ReviewAndRating> => {
    const result = await prisma.reviewAndRating.delete({
        where: {
            id
        },
        
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