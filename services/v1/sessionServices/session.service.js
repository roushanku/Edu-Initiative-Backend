import Session from "../../../models/session.model.js";
import HireTutor from "../../../models/hireTutor.model.js";
import Tutor from "../../../models/tutor.model.js";
import Student from "../../../models/student.model.js";
export const createSession = async (session) => {
    try {
        const hireRequesId = session.hireRequestId;
        const hireRequest = await HireTutor.findById(hireRequesId);
        
        if (!hireRequest) {
            return { status: false, message: "Hire request not found" };
        }

        const tutorId = session.tutorId;
        const tutor = await Tutor.findById(tutorId);

        if (!tutor) {
            return { status: false, message: "Tutor not found" };
        }

        const studentId = session.studentId;
        const student = await Student.findById(studentId);

        if (!student) {
            return { status: false, message: "Student not found" };
        }
        const startDate = session.startDate;
        const endDate = session.endDate;

        if (startDate > endDate) {
            return { status: false, message: "Start date cannot be after end date" };
        }

        const newSession = await Session.create(session);
        return { status: true, 
            message: "Session created successfully", 
            data: newSession
         };
    }
    catch {
        logger.error(`Error creating session: ${error.message}`);
        return { status: false, message: "Error creating session" };
    }
}