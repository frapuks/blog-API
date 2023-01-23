import Joi from "joi";

const categoryBodySchema = Joi.object({
	route : Joi.string().pattern(new RegExp('^/[a-z0-9]*$')),
	label : Joi.string()
}).required();

export {categoryBodySchema};