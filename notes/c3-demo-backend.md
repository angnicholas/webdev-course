
# Module 3: Backend Demonstration

We will now be introduced to the structure of a FS project to understand what each part does and how the whole system works together, and have a feel of what running the application is like.

First, the backend.

## Run the application

1. Clone the repository ```git clone``` into your local machine / download a zip file
2. Run the backend server
    - ```cd``` into ```example2-locallibrary/backend-ref/```
    - Initialise a fresh python venv
    - ```pip install -r requirements.txt``` or ```pip3 install -r requirements.txt```
    - ```python manage.py migrate```
    - ```python manage.py runserver```


## Structure and Flow of a Backend App (Demo) 

1. The Model View Controller Architecture
    - Routing/Control (urls.py): Resolves URL
    - View (views.py): Handles a request
    - Model (models.py): Defines the data model for the database

2. Model: How to Represent the World?
    - Objects, fields and constraints
    - Foreign Keys and relationship multiplicity

3. Views: From Hit to Response
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


## Practical Exercise

Create an account on Postman to play with the backend server.

Let us now track what happens from the moment someone sends an API request to the moment it receives a response. Remember the order is request -> urls.py -> views.py -> response.

Let us look at different ways of handling the same API request.
- First, just a bare bones method.
- Next, using the generic methods provided to us by Django Rest Framework, without a custom serializer class.
- Lastly, using a Custom Serializer class. 

Put print statements at every point in the method to track the flow the application -> Who is sending information to who and what are the effects.

Before and after the request, use Sqlite Viewer application to view the Database state, observe changes in database.

Send various kinds of requests (illegal requests, etc.) using Postman or the Requests library and observe the different status codes and resposnes sent by the backend.

Show how error handling can be used to catch these illegal requests and handle them gracefully.
