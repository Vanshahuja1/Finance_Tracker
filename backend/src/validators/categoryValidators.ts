import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid("income", "expense", "any").default("any"),
});
