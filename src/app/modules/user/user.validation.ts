import { z } from "zod";

const create = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
          }),
          email: z.string({
            required_error: "Email is required",
          }).email({
            message: "Invalid email format",
          }),
          password: z.string({
            required_error: "Password is required",
          }),
          role: z.string({
            required_error: "Role is required",
          }),
          contactNo: z.string({
            required_error: "Contact number is required",
          }),
          address: z.string({
            required_error: "Address is required",
          }),
          profileImg: z.string().optional(),
        })
    })

export const UserValidation = {
    create
}