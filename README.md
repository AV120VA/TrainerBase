# TrainerBase

Live Link: https://trainerbase.onrender.com/

## Overview

TrainerBase is a community-focused social platform inspired by Reddit, designed specifically for Pokémon trainers. It allows users to create and join communities, share posts, comment, and save content related to different aspects of Pokémon gaming.

## Getting Started

### Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-repo/trainerbase.git
   ```

2. **Install backend dependencies:**

   ```sh
   pipenv install -r requirements.txt
   ```

3. **Set up the database:**

   ```sh
   pipenv shell
   flask db upgrade
   flask seed all
   ```

4. **Install frontend dependencies:**

   ```sh
   cd react-vite
   npm install
   ```

5. **Start the backend server:**

   ```sh
   flask run
   ```

6. **Start the frontend server:**
   ```sh
   npm run dev
   ```

## Features

- User authentication (sign-up, login, logout, demo user)
- Create and join Pokémon-focused communities
- Create, edit, and delete posts within communities
- Comment on posts with full CRUD functionality
- Save posts for later viewing
- Image support for posts
- Community search functionality

## Database Schema

### Users Table

| Column          | Type         |
| --------------- | ------------ |
| id              | integer (PK) |
| username        | varchar(40)  |
| email           | varchar(255) |
| hashed_password | string       |
| created_at      | timestamp    |
| updated_at      | timestamp    |

### Communities Table

| Column      | Type                  |
| ----------- | --------------------- |
| id          | integer (PK)          |
| name        | varchar(50)           |
| description | text                  |
| user_id     | integer (FK -> Users) |
| created_at  | timestamp             |
| updated_at  | timestamp             |

### Posts Table

| Column       | Type                        |
| ------------ | --------------------------- |
| id           | integer (PK)                |
| title        | varchar(50)                 |
| content      | text                        |
| user_id      | integer (FK -> Users)       |
| community_id | integer (FK -> Communities) |
| likes        | integer                     |
| created_at   | timestamp                   |
| updated_at   | timestamp                   |

### Comments Table

| Column     | Type                  |
| ---------- | --------------------- |
| id         | integer (PK)          |
| content    | text                  |
| user_id    | integer (FK -> Users) |
| post_id    | integer (FK -> Posts) |
| created_at | timestamp             |
| updated_at | timestamp             |

### SaveForLaters Table

| Column     | Type                  |
| ---------- | --------------------- |
| id         | integer (PK)          |
| user_id    | integer (FK -> Users) |
| post_id    | integer (FK -> Posts) |
| created_at | timestamp             |
| updated_at | timestamp             |

## API Routes

### Communities

- **GET** `/api/communities/` - Get all communities
- **GET** `/api/communities/<int:id>` - Get specific community
- **POST** `/api/communities/` - Create new community
- **DELETE** `/api/communities/<int:id>` - Delete community

### Posts

- **GET** `/api/posts` - Get all posts
- **GET** `/api/communities/<int:id>/posts` - Get all posts in community
- **POST** `/api/posts/` - Create new post
- **PUT** `/api/posts/<int:id>` - Update post
- **DELETE** `/api/posts/<int:id>` - Delete post

### Comments

- **GET** `/api/posts/<int:id>/comments` - Get post comments
- **POST** `/api/comments/` - Create comment
- **PUT** `/api/comments/<int:id>` - Update comment
- **DELETE** `/api/comments/<int:id>` - Delete comment

### Save Posts

- **POST** `/api/posts/<int:id>/save` - Save post
- **DELETE** `/api/posts/<int:id>/unsave` - Unsave post
- **GET** `/api/posts/saved` - Get saved posts

## User Stories

### Authentication

- Users can sign up, log in, and log out
- Users can log in as a demo user

### Communities

- Users can create and join communities
- Users can view all available communities
- Community creators can delete their communities

### Posts

- Users can create posts within communities
- Users can edit and delete their own posts
- Users can save posts for later viewing

### Comments

- Users can comment on posts
- Users can edit and delete their own comments
- Comments are displayed in chronological order

## Technologies Used

- **Frontend:** React, React Router, Redux, Vite
- **Backend:** Flask, SQLAlchemy, PostgreSQL
- **Authentication:** Flask-Login
- **Image Handling:** Direct URL storage - AWS coming soon
- **Deployment:** Render

## Future Enhancements

- Implement post likes/dislikes functionality
- Add AWS image upload capability
- Enable user profile customization
- Add direct messaging between users
- Implement post tags and filtering
- Add moderation tools for community owners

