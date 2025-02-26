import Joi from "joi";

export const transactionSchema = Joi.object({
    type: Joi.string().valid("income", "expense").required(),
    category: Joi.string().required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required(),
    description: Joi.string().optional(),
});
