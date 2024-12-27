import { tutorService } from '../../../services/index.js';

export const getTutors = async (req, res) => {
  const response = await tutorService.getTutors();
  res.json(response);
};

export const createTutorApplication = async (req, res) => {
  // console.log(req.body);
  // res.json({status : true , message : "Tutor application created successfully"});
  const response = await tutorService.createTutorApplication(req.user, req.body);
  res.json(response);
};

export const hireTutor = async (req, res) => {
  const response = await tutorService.hireTutor(req.body);
  res.json(response);
};

export const createTutorProfile = async (req, res) => {
  try {
    const response = await tutorService.createTutorProfile(req.body);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getTutorById = async (req, res) => {
  try {
    const response = await tutorService.getTutorById(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllTutorsQuery = async (req, res) => {
  const { priceRange, rating, teachingMethodology, medium, subjects } = req.query;

  let filters = {};
  if (priceRange) {
    let [min, max] = priceRange.split('-').map(Number);
    filters.priceRange = { min, max };
  }
  if (rating) {
    filters.rating = rating;
  }

  if (teachingMethodology) {
    filters.teachingMethodology = teachingMethodology;
  }

  if (medium) {
    filters.medium = medium;
  }

  if (subjects) {
    filters.subjects = subjects;
  }

  const response = await tutorService.getAllTutors(filters);
  res.json(response);
};

export const getAllTutors = async (req, res) => {
  console.log('from controller');
  try {
    const { priceRange, teachingMethodology, languages, rating, levels, page = 1, limit = 10, sortBy, sortOrder = 'desc' } = req.query;

    // Validate inputs
    if (rating && isNaN(Number(rating))) {
      return res.status(400).json({
        status: false,
        message: 'Invalid rating value',
      });
    }

    if (priceRange) {
      // const [min, max] = priceRange.split('-').map(Number);
      // filters.priceRange = { min, max };
      try {
        const [min, max] = priceRange.split('-').map(Number); // Declare once
        console.log(min, max); // Debug logs

        // if (isNaN(min) || isNaN(max)) {
        //   return res.status(400).json({
        //     status: false,
        //     message: 'Invalid price range values',
        //   });
        // }

        filters.priceRange = { min, max }; // Set filter if valid
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: 'Invalid price range format',
        });
      }
    } else {
      filters.priceRange = null; // Default value
    }

    const filters = {
      priceRange: priceRange ? JSON.parse(priceRange) : null,
      teachingMethodology: teachingMethodology ? teachingMethodology.split(',') : [],
      languages: languages ? languages.split(',') : [],
      rating: rating ? Number(rating) : null,
      levels: levels ? levels.split(',') : [],
      pagination: {
        page: Number(page),
        limit: Number(limit),
      },
      sort: {
        field: sortBy,
        order: sortOrder,
      },
    };

    console.log('from controller 1');

    const { tutors, total } = await tutorService.getAllTutors(filters);

    console.log('from controller 2');

    res.json({
      status: true,
      message: 'Tutors retrieved successfully',
      data: tutors,
      pagination: {
        current: filters.pagination.page,
        limit: filters.pagination.limit,
        total,
        pages: Math.ceil(total / filters.pagination.limit),
      },
    });
  } catch (error) {
    console.error('Error fetching tutors:', error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateTutorProfile = async (req, res) => {
  try {
    const response = await tutorService.updateTutorProfile(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const deleteTutorProfile = async (req, res) => {
  try {
    const response = await tutorService.deleteTutorProfile(req.params.id);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const addSubject = async (req, res) => {
  try {
    const response = await tutorService.addSubject(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export const addAvailability = async (req, res) => {
  try {
    const response = await tutorService.addAvailability(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
};

export const updateIsActive = async (req, res) => {
  try {
    const response = await tutorService.updateIsActive(req.params.id, req.body.isActive);
    res.json(response);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
