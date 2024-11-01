import Joi from "joi";

export const createSubject = {
  body: Joi.object().keys({
    subjectName: Joi.string().min(3).max(100).required(),
    subjectCode: Joi.string().alphanum().min(2).max(10).required()
  }),
}

export const getSubjectById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}

export const updateSubject = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    subjectName: Joi.string().min(3).max(100).required(),
    subjectCode: Joi.string().alphanum().min(2).max(10).required()
  }),
}

export const deleteSubject = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}



