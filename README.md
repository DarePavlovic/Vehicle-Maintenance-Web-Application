# **Web Application for Vehicle Maintenance Management**  

## **Overview**  
A **web-based system** designed to **streamline vehicle maintenance operations** within a company. This application enables **real-time tracking of vehicle repairs, fuel consumption, and expenses**, improving efficiency and reducing operational costs.  

Built using the **MEAN stack** (**MongoDB, Express.js, Angular, Node.js**), it provides **a centralized platform** with **role-based access** for **Administrators, Mechanics, and Drivers** to manage and track vehicle maintenance records.  

---

## **Features**  
### 🔹 **User Authentication & Role Management**  
✔ Secure authentication using **JWT (JSON Web Token)**  
✔ Role-based access for **Administrators, Mechanics, and Drivers**  
✔ Personalized dashboard with relevant data  

### 🔹 **Vehicle Tracking & Maintenance**  
✔ Log **vehicle mileage, fuel consumption, and repair history**  
✔ Assign mechanics to specific **repair tasks**  
✔ Track the **status of maintenance requests** in real time  

### 🔹 **Expense & Cost Monitoring**  
✔ Maintain a **detailed financial record** of maintenance costs  
✔ **Approval system** for expense validation by Administrators  
✔ Analyze spending patterns to **optimize costs**  

### 🔹 **Optimized Database & Performance**  
✔ Structured **MongoDB schema** for scalability  
✔ Efficient **handling of images** stored as **Base64**  
✔ **Asynchronous data fetching** using Angular’s `forkJoin`  

---

## **Technology Stack**  
| Component       | Technology Used |
|----------------|----------------|
| **Frontend**   | Angular, TypeScript, HTML, SCSS |
| **Backend**    | Node.js, Express.js |
| **Database**   | MongoDB (Mongoose ODM) |
| **Real-time Updates** | WebSockets (SignalR) |
| **Authentication** | JWT (JSON Web Token) |
| **Image Handling** | Base64 Encoding |
| **Hosting**    | Docker, Cloud Deployment |

---

## **Installation & Setup**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/your-username/vehicle-maintenance-management.git
cd vehicle-maintenance-management
```

### **2. Install Dependencies**  
#### Backend  
```bash
cd backend
npm install
```

#### Frontend  
```bash
cd frontend
npm install
```

### **3. Configure Environment Variables**  
Create a `.env` file in the `backend` directory and define:  
```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

### **4. Run the Application**  
#### Start Backend Server  
```bash
cd backend
npm start
```

#### Start Frontend Server  
```bash
cd frontend
ng serve --open
```

---

## **API Documentation**  
For a detailed explanation of API endpoints, refer to the **API Documentation** in the `/docs` folder or access it via Postman.  

---

## **Future Enhancements**  
✅ **Automated Maintenance Scheduling**  
✅ **Predictive Analytics for Vehicle Repairs**  
✅ **Integration with GPS Tracking Systems**  
✅ **Advanced Data Visualization for Reporting**  

---

## **Contributing**  
We welcome contributions! If you’d like to enhance the project, **fork the repository, make your changes, and submit a pull request**.  

---

## **License**  
This project is licensed under the **MIT License**.  
