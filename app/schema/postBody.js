import Joi from "joi";

const postBodySchema = Joi.object({
    category_id : Joi.number(),
    slug : Joi.string().pattern(new RegExp('^([a-z0-9]+-)*[a-z0-9]+$')),
	title : Joi.string(),
	excerpt : Joi.string(),
	content : Joi.string()
}).required();

export {postBodySchema};