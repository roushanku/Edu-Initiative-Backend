import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import Tutor from "../models/tutor.model.js";
const createUserController = (req, res) => {
    const {name , email , phone , whatsapp , address , pincode , role} = req.body;

    if(!name || !email || !phone || !whatsapp || !address || !pincode || !role){
        return res.status(400).json({
            status : false,
            error : "All fields are required"
        });
    }

    const user = new User({
        name,
        email,
        phone,
        whatsapp,
        address,
        pincode,
        role
    });

    user.save();

    const userId = user._id;

    //check student or tutor

    if(role === "student") {
        const {classes , subjects , hours_per_day , days_per_week , expected_fees , preferred_gender , preferred_exp , preferred_timing} = req.body;
        if(!classes || !subjects || !hours_per_day || !days_per_week || !expected_fees || !preferred_gender , !preferred_exp , !preferred_timing){
            return res.status(400).json({
                status : false,
                error : "All fields are required"
            });
        }

        const student = new Student({
            userId,
            classes,
            subjects,
            hours_per_day,
            days_per_week,
            expected_fees,
            preferred_exp,
            preferred_gender,
            preferred_exp,
            preferred_timing
        });

        student.save();

        return res.status(201).json({
            status : true,
            message : "Student created successfully",
            student
        });
    }

    else {
        const {qualifications , experience , expertise , timing_preferred , days_available , no_of_hours, status} = req.body;
        if(!qualifications || !experience || !expertise || !timing_preferred || !days_available || !no_of_hours || !status){
            return res.status(400).json({
                status : false,
                error : "All fields are required"
            });
        }

        const tutor = new Tutor({
            userId,
            qualifications,
            experience,
            expertise,
            timing_preferred,
            days_available,
            no_of_hours,
            status
        });

        tutor.userId = userId;
        tutor.save();

        res.status(201).json({
            status : true,
            message : "Tutor created successfully",
            tutor
        });
    }
}

export { createUserController };