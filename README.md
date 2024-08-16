# Remsoft-front

## Description

This project is the frontend part of the Remsoft full-stack order management application. The frontend is built using **Angular** and provides a user interface to interact with the backend services for managing orders, products, and suppliers. The main technologies used in this project are:

### Technologies Used

- **Angular**: A platform and framework for building single-page client applications using HTML and TypeScript.
- **Angular Material**: A UI component library for Angular developers that provides modern, responsive components.
- **Angular Flex Layout**: Provides a powerful flexbox-based layout system for Angular applications.
- **RxJS**: A library for reactive programming using observables, used extensively within Angular for managing asynchronous data streams.
- **JWT (JSON Web Token)**: Used for securely transmitting information between the frontend and backend.
- **CryptoJS**: A library of cryptographic algorithms used for secure data handling in the frontend.
- **Express**: A minimal and flexible Node.js web application framework used to serve the Angular application in server-side rendering (SSR) mode.

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure that Node.js is installed and configured on your machine.
- **Angular CLI**: Angular Command Line Interface is required to build and run the Angular application.
- **Docker**: Docker is required if you are running the backend and database services in containers.

### Cloning the Repository

1. Open a terminal or command prompt.
2. Clone the repository:

   ```bash
   git clone https://github.com/JoeVictor133/remsoft-order-front.git
   cd remsoft-front

### Installing Dependencies

1. Install the required dependencies by running the following command in the root directory of the project:

    ```bash
    npm install
    ```

### Building and Running the Application

1. To build the Angular application, run the following command:

    ```bash
    npm run build
    ```

2. To start the application in development mode, run:

    ```bash
    npm start
    ```

3. The application will start on `http://localhost:4200`.

### Running the Application in an IDE

You can also run the Angular application directly from an IDE. Here is an example for **Visual Studio Code**:

#### Visual Studio Code

1. **Open the Project**: Open Visual Studio Code, and select `File > Open Folder` to open the root directory of your project.

2. **Install Dependencies**: Open the integrated terminal in Visual Studio Code (`Ctrl +` ), and run `npm install`.

3. **Run the Application**: In the terminal, run `npm start`. Alternatively, you can use the built-in npm scripts runner by navigating to the `npm scripts` section in the sidebar and selecting `start`.

### Configuration

The frontend interacts with the backend via RESTful APIs. You may need to configure the API URLs if your backend is hosted on a different server or port. This can be done in the Angular service files where the `apiUrl` is defined.

For example, in `order.service.ts`:

  ```bash
      private apiUrl = 'http://localhost:8080/api/orders';
  ```


### Docker Integration

If you are running the backend and database services in Docker, ensure they are up and running before starting the frontend. The frontend assumes that the backend API is available at `http://localhost:8080`.

### Registering and Logging In

1. **Register**: Navigate to `http://localhost:4200/register` to create a new account.
2. **Login**: After registration, navigate to `http://localhost:4200/login` to log in with your credentials.
3. **Navigate**: Once logged in, you can navigate through the application to manage orders, products, and suppliers.
