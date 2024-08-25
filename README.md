# MedEasy

MedEasy is a cutting-edge cloud-based platform developed to revolutionize the way medicines are ordered online. By harnessing the power of AWS and GCP services, MedEasy automates the entire process—from prescription uploads to final order fulfillment—ensuring a seamless and efficient experience for both users and sellers.

## Objective

MedEasy – a comprehensive cloud-based platform designed to revolutionize the medicine ordering process. Utilizing hashtag#AWS and hashtag#GCP services, MedEasy automates everything from prescription uploads to final order fulfillment, ensuring a seamless and efficient user experience.

The platform not only facilitates easy prescription uploads and medicine ordering but also integrates advanced analytics and real-time notifications to provide a comprehensive and efficient solution. By doing so, MedEasy aims to become the go-to platform for online medicine ordering, delivering convenience, accuracy, and efficiency.

## System Architecture Diagram
![MedEasy Architecture Diagram](https://github.com/pateljay15/MedEasy-serverless-cloud-app-/blob/master/MedEasy%20Architecture%20Diagram/Med%20Easy%20Architecture%20Diagram.png)

## Key Features & Modules

### 1. Prescription & Order Processing Module
- **Workflow Orchestration**: Utilizes AWS Step Functions to coordinate the end-to-end process from prescription upload to order fulfillment.
- **Data Extraction**: Prescription images are stored in Amazon S3, and AWS Textract is used to accurately extract text.
- **Inventory Matching**: Medications are matched against the inventory stored in Amazon DynamoDB.
- **Order Processing**: Orders are processed, and order confirmation events are triggered and sent to AWS EventBridge.

### 2. Inventory & Data Management Module
- **Data Storage**: Amazon DynamoDB is used for fast and reliable storage of medicine inventory and order details.

### 3. Notification Module
- **Real-Time Notifications**: AWS Simple Notification Service (SNS) is used to send real-time notifications to users about their orders and to sellers about inventory alerts.

### 4. Event-Driven Architecture
- **Event Coordination**: AWS EventBridge facilitates event-driven processes, including periodic inventory alerts and order confirmations.

### 5. Data Storage/Lake
- **Data Lake**: Amazon S3 serves as a data lake for processed orders and securely stores user prescription images.

### 6. Automatic Infrastructure Provisioning
- **Serverless Infrastructure**: AWS CloudFormation is used for automatic provisioning of the entire serverless infrastructure, ensuring scalability and consistent management.

### 7. Data Lake & ETL Module
- **ETL Pipeline**: AWS Glue is employed for data extraction, transformation, and loading (ETL) to archive order data stored in S3.
- **Data Insights**: GCP BigQuery and Looker Studio are used to visualize data and generate insights on top-selling medicines.

## Cloud Architecture Overview

MedEasy is deployed using a Public Cloud model on AWS, utilizing a suite of managed services to ensure cost-efficiency, scalability, and global accessibility. The final architecture integrates several AWS services including API Gateway, Step Functions, Lambda, S3, DynamoDB, Textract, EventBridge, and SNS.

## Programming Languages

- **Node.js**: For AWS Lambda functions, enabling high-performance, asynchronous operations.
- **JavaScript (React)**: For the frontend application, delivering a dynamic and responsive user interface.

## Deployment Details

- **Frontend**: Deployed on Netlify, offering scalable and performant delivery of the React-based frontend.
- **Backend**: The serverless backend infrastructure is deployed on AWS using CloudFormation templates for automated management.

## Future Developments

- **Personalized Recommendations**: Leveraging Amazon Personalize to deliver tailored medicine recommendations to users based on historical order data.

## Getting Started

To deploy MedEasy, follow these steps:
1. Clone the repository.
2. Deploy the backend using AWS CloudFormation templates.
3. Deploy the frontend on Netlify or another preferred platform.
4. Configure the AWS services as described in the architecture.

## Contact

For more information, please contact Jay Patel at jaypatel45677@gmail.com.

