import Subject from "../../../models/subject.model.js"
export const getAllSubjectsService = async () => {
  const subjects = await Subject.find();
  return { status: true, message: "Subjects fetched",count: subjects.length, data: subjects };
};

export const getSubjectById = async (id) => {
  const subject = await Subject.findById(id);
  if(!subject) {
    return { status: false, message: "Subject not found" };
  }
  return { status: true, message: "Subject fetched", data: subject };
};

export const createSubject = async (data) => {
  const existingSubject = await Subject.findOne({ subjectCode: data.subjectCode });
  if(existingSubject) {
    return { status: false, message: "Subject already exists with this code." };
  }
  const subject = await Subject.create(data);
  return { status: true, message: "Subject created", data: subject };
};

export const updateSubject = async (id, data) => {
  const updateSubject =  await Subject.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if(!updateSubject) {
    return { status: false, message: "Subject not found" };
  }
  return { status: true, message: "Subject updated", data: updateSubject };
};

export const deleteSubject = async (id) => {
  const subject =  await Subject.findByIdAndDelete(id);
  if(!subject) {
    return { status: false, message: "Subject not found" };
  }
  return { status: true, message: "Subject deleted" };
};
