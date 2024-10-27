# Tutoring Platform Database Documentation

## Table of Contents
1. User Management Schemas
2. Educational Content Schemas
3. Session Management Schemas
4. Supporting Schemas
5. Schema Relationships
6. Best Practices

## 1. User Management Schemas

### User Schema (`users`)
Base schema for all users in the system (students, tutors, admins)

**Fields:**
```javascript
{
  _id: ObjectId,            // Unique identifier for the user
  email: String,           // User's email address (unique)
  password: String,        // Hashed password
  firstName: String,       // User's first name
  lastName: String,        // User's last name
  phoneNumber: String,     // Contact number
  addresses: [ObjectId],   // References to Address schema
  profilePicture: String,  // URL to profile picture
  role: String,           // 'student', 'tutor', or 'admin'
  isActive: Boolean,      // Account status
  createdAt: Date,        // Account creation timestamp
  updatedAt: Date         // Last update timestamp
}
```

**Important Notes:**
- Every user must have a unique email
- Passwords should be hashed before storing
- One user can have multiple addresses
- Role determines access rights in the system

### Tutor Schema (`tutors`)
Extended profile for users who are tutors

**Fields:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,        // Reference to User schema
  education: [{
    degree: String,        // Degree name
    institution: String,   // Institution name
    graduationYear: Number,
    documents: [String]    // URLs to certificates
  }],
  experience: [{
    institution: String,   // Where they taught
    position: String,      // Role held
    startDate: Date,
    endDate: Date,
    description: String
  }],
  subjects: [{
    name: String,         // Subject name
    level: [String],      // Teaching levels
    hourlyRate: Number    // Charge per hour
  }],
  availability: [{
    dayOfWeek: Number,    // 0-6 (Sunday-Saturday)
    startTime: String,    // "HH:mm" format
    endTime: String
  }],
  ratings: {
    averageRating: Number,
    totalRatings: Number
  },
  verificationStatus: String  // 'pending', 'verified', 'rejected'
}
```

**Important Notes:**
- Each tutor must have a corresponding user account
- Tutors can teach multiple subjects at different levels
- Verification status ensures quality control

### Student Schema (`students`)
Extended profile for users who are students

**Fields:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,         // Reference to User schema
  gradeLevel: String,       // Current grade/year
  school: String,           // Current school/institution
  subjects: [{
    name: String,          // Subject name
    level: String         // Current level in subject
  }],
  learningPreferences: {
    preferredLanguage: String,
    learningStyle: [String],  // 'visual', 'auditory', etc.
    groupPreference: String   // 'individual', 'group', 'both'
  },
  parentGuardianInfo: {      // For minor students
    name: String,
    relation: String,
    phoneNumber: String,
    email: String
  }
}
```

## 2. Session Management

### Hire Request Schema (`hireRequests`)
Initial request to hire a tutor

**Fields:**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,    // Reference to Student
  tutorId: ObjectId,      // Reference to Tutor
  subjectId: ObjectId,    // Reference to Subject
  addressId: ObjectId,    // Where lessons will take place
  modeOfStudy: String,    // 'ONLINE' or 'OFFLINE'
  schedule: {
    days: [{
      day: String,        // Day of week
      startTime: String,  // "HH:mm" format
      endTime: String
    }],
    startDate: Date,      // When lessons should start
    duration: {
      value: Number,      // How long they want lessons
      unit: String        // 'MONTHS', 'WEEKS', 'DAYS'
    }
  },
  status: String,         // 'PENDING', 'ACCEPTED', 'REJECTED'
  convertedSessionId: ObjectId  // Reference to created session
}
```

**Purpose:**
- Acts as an initial request before creating a session
- Allows tutors to accept/reject requests
- Converts to a session when accepted

### Session Schema (`sessions`)
Active tutoring sessions

**Fields:**
```javascript
{
  _id: ObjectId,
  hireRequestId: ObjectId,   // Original hire request
  tutorId: ObjectId,         // Assigned tutor
  studentType: String,       // 'registered' or 'non-registered'
  student: {
    id: ObjectId,           // Student reference
    name: String           // Quick access to name
  },
  schedule: {
    original: {            // Initial schedule
      startDate: Date,
      endDate: Date,
      duration: {
        value: Number,
        unit: String
      }
    },
    current: {            // Can change with extensions
      startDate: Date,
      endDate: Date
    }
  },
  status: String,         // 'SCHEDULED', 'ONGOING', etc.
  pricing: {
    hourlyRate: Number,
    totalAmount: Number,
    currency: String
  },
  location: {
    type: String,         // 'ONLINE' or 'OFFLINE'
    addressId: ObjectId,  // For offline sessions
    meetingLink: String   // For online sessions
  },
  attendance: [{          // Track each lesson
    date: Date,
    status: String,      // 'PRESENT', 'ABSENT', etc.
    reason: String
  }]
}
```

## 3. Common Relationships

### Student to Session Flow:
```
Student → Hire Request → Session
```
- Student creates hire request
- Tutor accepts request
- System creates session

### Tutor to Subject:
```
Tutor → Subjects → Classes
```
- Tutor lists subjects they teach
- Can create structured classes
- Students can find tutors by subject

### Address Usage:
```
User → Addresses ← Sessions
```
- Users can have multiple addresses
- Sessions reference one address for location
- Used for distance calculations

## 4. Best Practices for Beginners

1. **Always Use References:**
   ```javascript
   // Good
   tutorId: { type: ObjectId, ref: 'Tutor' }
   
   // Avoid embedding large objects
   tutor: { /* entire tutor object */ }
   ```

2. **Status Tracking:**
   - Always include status fields
   - Add timestamps for status changes
   - Keep status history when important

3. **Validation:**
   - Add required: true for mandatory fields
   - Use enums for fixed value fields
   - Add min/max for numbers

4. **Indexing:**
   ```javascript
   // Common queries should have indexes
   db.sessions.createIndex({ tutorId: 1, status: 1 })
   db.users.createIndex({ email: 1 }, { unique: true })
   ```

Would you like me to:
1. Add more example queries for common operations?
2. Add validation rules and examples?
3. Include more detailed relationship explanations?
4. Add error handling guidelines?
5. Include data migration strategies?

This documentation aims to be beginner-friendly while covering all essential aspects. Let me know if you need clarification on any part!