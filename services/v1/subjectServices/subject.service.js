import Subject from "../../../models/subject.model.js";

export const createSubject = async (subjectData) => {
  const subjectCode = subjectData.subjectCode;
  const checkSubject = await Subject.findOne({ subjectCode });
  if (checkSubject) {
    return {
      status: false,
      message: "Subject already exists",
    };
  }
  const subject = await Subject.create(subjectData);
  return {
    status: true,
    message: "Subject created successfully",
    data: subject,
  };
};
