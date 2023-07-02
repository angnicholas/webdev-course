# Introduction to Web Development

## 0 Course Structure
1. High-Level Overview
2. Basic SWE Toolkit
3. Intro to Frontend Dev in React
4. Intro to Backend Dev in Django
5. Further SWE Toolkit

## 1 High-Level Overview

1. Motivation: Want computers to talk to each other. Solution: Send data via a protocol (Internet)

2. Web is one way of doing this. Involves sites 
    - static content (blog) 
    - stateful content (online shopping)

3. Client Server model of HTTP

2. HTTP Request: 
    - method (GET, PUT, POST)
    - URL (http://example.org/test/a/b/c/)
    - Payload.
    - ```Live Example: Postman, Python requests```

3. Backend-Frontend architecture: 
    - Frontend concerned about serving content (styling, etc.)
    - Backend concerned about managing state centrally (eg. users interacting with one another)

## 2 Basic SWE Toolkit
Reference: [Example Set 1](eg1-basicswe.md)
1. Dependency Management overview in Python and JavaScript
2. Basic shell commands & Unix directory structure (```ls, mkdir, cd```)


## 4 Intro to Backend Dev in Django

Reference: [Example Set 2a: Demonstration](eg2a-demo.md) navigate to backend section

1. Structure of a Django Project (MVC arch) - 
    - Routing/Control (urls.py): Resolves URL
    - View (views.py): Handles a request
    - Model (models.py): Defines the data model for the database

2. Workflow
    - Step 1. Define your data model 
    - Step 2. Define your API endpoints and expected behaviour
    - Step 3. Implement data model in models.py
    - Step 4. Implement APIs in views.py + urls.py
    - Step 5. Test using Postman

3. Data modelling
    - Objects, fields and constraints
    - Foreign Keys and relationship multiplicity

4. API Views
    - Parsing the payload + URL
    - Performing Data Queries using the ORM
    - Returning a response
        - Status Code (200 OK, 404 Not Found, 403 Unauth)
        - Data 
    - Advanced Topics and Considerations: 
        - Generics
        - Serializers
        - N+1 Query problem
        - Sanitising user input + Authentication (Let's not care about this ATM)

5. Now recreate it in [Example Set 2b](eg2b-backend.md)


## 3 Intro to Frontend Dev in React

Reference: [Example Set 2a: Demonstration](eg2a-demo.md) navigate to frontend section

1. Component structure: Tree

2. Props and Hooks

3. Now recreate [Example Set 2c: Frontend](eg2c-frontend.md)


## 5 Further SWE Toolkit
1. Documentation in Markdown
2. Source Control in Git
3. Shell Scripting