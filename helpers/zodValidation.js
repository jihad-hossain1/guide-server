const {z} = require('zod');

// Define Joi schema for input validation
const profileSchema = z.object({
  description: z.string({error: "Name is required"}).min(20,{ message: "Must be 20 or more characters long" }).max(1500, { message: "Must be 1500 or more characters long" }).required(),
  uptoPeople: z.number().integer().positive(),
  clientId: z.string().required(),
  cityId: z.string().required(),
  countryId: z.string().required(),
  responseTime: z.string(),
  languages: z.array().items(z.string()),
  profileImage: z.string(),
  type: z.string().required(),
});


module.exports = { profileSchema };