# Server Code Setup and Usage

## Setup

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Create a `.env` file in the root directory with the following variables:
   - `MONGO_URI`: The MongoDB connection string.
   - `JWT_SECRET`: The secret key used for generating JWTs.
   - `COOKIE_SECRET`: The secret key used for signing cookies.
   - `SENDGRID_API_KEY`: The SendGrid API key used for sending emails.
4. Run `npm run dev` to start the server in development mode.

## API Usage

The API endpoints are as follows:

### User Endpoints

- **POST /api/v1/user/register**: Registers a new user.
  - Request Body- All the fields are required:
    - `name`: The user's name.
    - `email`: The user's email.
    - `password`: The user's password.
    - `company_name`: The user's company name.
    - `dob`: The user's date of birth.
    - `avatar`: The user's avatar.
  - Response:
    - `user`: The newly created user object.
  
- **POST /api/v1/user/login**: Logs in an existing user.
  - Request Body:
    - `email`: The user's email.
    - `password`: The user's password.
  - Response:
    - `accessToken`: The access token used for authentication.
    - `refreshToken`: The refresh token used to obtain a new access token.

### Authentication Endpoints

- **POST /api/v1/auth/verify-otp**: Verifies the OTP sent to the user's email.
  - Request Body:
    - `otp`: The OTP received via email.
  - Response:
    - `user`: The user object if the OTP is valid.
  
- **POST /api/v1/auth/resend-otp**: Resends the OTP to the user's email.
  - Request Body:
    - `email`: The user's email.
  - Response:
    - `message`: The success message.

### Logout Endpoint

- **POST /api/v1/auth/logout**: Logs out the user.
  - Request Cookies:
    - `accessToken`: The access token used for authentication.
    - `refreshToken`: The refresh token used to obtain a new access token.

### User Profile Endpoint

- **GET /api/v1/user**: Retrieves the user's profile information.
  - Request Cookies:
    - `accessToken`: The access token used for authentication.
  - Response:
    - `user`: The user object.
  
### Delete Account Endpoint

- **DELETE /api/v1/user**: Deletes the user's account.
  - Request Cookies:
    - `accessToken`: The access token used for authentication.
  - Response:
    - `message`: The success message.

## Operational Guidelines

1. Make sure to update the `MONGO_URI` in the `.env` file according to your MongoDB setup.
2. Make sure to update the `SENDGRID_API_KEY` in the `.env` file according to your SendGrid setup.
3. Make sure to update the `COOKIE_SECRET` in the `.env` file according to your secret key.
4. Make sure to update the `JWT_SECRET` in the `.env` file according to your secret key.
