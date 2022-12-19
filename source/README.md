Add your source code files to this directory. Please don't rename this directory.
What Intelligent Extractor does ? 
A Low-Code/No-Code based Product which is scalable (hosted on Azure Kubernetes with CI CD) to enable Intelligent Data extraction to accelerate data entry for Loan Officers/other Finance product users using Computer Vision of Azure, Self Service Bot with QnA Maker for answering Financial related Questions, Prediction for Mortgage approval/House pricing - Azure ML model
How we built it ?
Leveraging the power of Vision API of Azure platform, processed the document and store the co-ordinates of one baseline image. Similar structured documents can be uploaded which inturn get stored in Microsoft Blob storage. Using the co-ordinates saved in Cosmos DB, we process multiple documents in batches and extract the data. Also, we have a Self service bot built using QnA Maker. Solution is hosted on Azure Kubernetes Services. Data is stored in Cosmos DB with API for MongoDB.
Accomplishments that we're proud of: 
Successfully implemented the Low code / No code way of OCR product which eliminates coding effort and any end user can leverage this product for defining his model himself and start uploading multiple documents in batches
What we learned ?
Power of Vision API, Cosmos DB usage
What's next for Intelligent Extractor ?
Integrate more cognitive services like Face API, Speech to text convertor for further taking this product to next level

Source code briefing:

We have segregated the application source code files under "Front end" and "Back end"

Front end Tech stack: ReactJS

Back end Tech stack: Python, Django

DB: MongoDB

Details of Front end components:

Key files under Front end:

Dockerfile - run application on nginx
deployment.yaml - enable the application to run on Azure Kubernetes Services (AKS)
index.js - initial file to be invoked when comtainer run
route.js - container all routes for application
nginxconf - webserver configuration file
app.js  - landing file for the front end


Key files under Back end:

Dockerfile - for containerizing the backend Python - Djnago components
deployment.yaml - enable the application to run on Azure Kubernetes Services (AKS)
Manage.py - Django initializing file
settings.py - Django configuration file
requirements.txt - all python based libraries listed for runtime installation
url.py - contains all application urls



