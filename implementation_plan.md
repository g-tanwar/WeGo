# WeGo - MERN Stack Implementation Plan

This project has been successfully migrated to the MERN stack (MongoDB, Express, React/Next.js, Node.js).
The database is connected to your MongoDB Atlas cluster.

## Phase 1: Foundation (Completed)
- [x] **Backend Migration**: Removed MySQL/Sequelize, installed Mongoose.
- [x] **Database Config**: Connected to MongoDB Atlas.
- [x] **Auth System**: Updated User model and Auth routes for MongoDB.
- [x] **Data Models**: Created Mongoose schemas for Users, Districts, and Messages.
- [x] **Chat History**: Implemented persisted chat history in MongoDB.
- [x] **Frontend Updates**: Updated Dashboard and Chat implementation to support MongoDB ObjectIds.

## Phase 2: Doubt Solving Platform (Next Priority)
To support "students solving each others doubts":
1.  **Backend**:
    -   Create `Doubt` model:
        ```javascript
        {
          title: String,
          description: String,
          tags: [String], // e.g., ['JavaScript', 'React']
          author: { type: ObjectId, ref: 'User' },
          answers: [{ 
            content: String, 
            author: { type: ObjectId, ref: 'User' }, 
            upvotes: Number 
          }]
        }
        ```
    -   Create Routes: `GET /api/doubts`, `POST /api/doubts`, `POST /api/doubts/:id/answer`.
2.  **Frontend**:
    -   Create `/dashboard/doubts` page.
    -   Implement specific UI for code formatting (maybe use a markdown editor).
    -   Add "Solved" status toggle.

## Phase 3: Dynamic User Groups
To allow students to "make groups":
1.  **Backend**:
    -   Create `Group` model (similar to District but user-created).
    -   Add `members` array to Group model.
    -   Add `created_by` field.
2.  **Frontend**:
    -   "Create Group" Modal in the Dashboard.
    -   "My Groups" sidebar section.

## Phase 4: Profiles & Networking
To "connect to each other":
1.  **Profile Page**: `/profile/[username]`.
2.  **Edit Profile**: Add bio, skills, and social links.
3.  **Direct Messaging**: (Optional extension of the chat system).

## Deployment
- Frontend: Vercel (Recommended for Next.js).
- Backend: Render or Heroku (Node.js hosting).
- Database: MongoDB Atlas (Already configured).
