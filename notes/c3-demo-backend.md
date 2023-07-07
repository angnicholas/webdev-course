
# Module 3: Backend Demonstration

We will now be introduced to the structure of a FS project to understand what each part does and how the whole system works together, and have a feel of what running the application is like.

In order to do this, we will be running a backend server on our localhost. This simulates a real server running off our machine, except the only people allowed to connect to it is ourselves. 

First, we will look through the Backend Code.

## Installation Steps to Follow along

### Running the App

1. Clone the repository ```git clone``` into your local machine / download a zip file
2. Run the backend server
    - ```cd``` into ```trisearch/backend/```
    - Initialise a fresh python venv
    - ```pip install -r requirements.txt``` or ```pip3 install -r requirements.txt```
    - ```python manage.py migrate```
    - ```python manage.py runserver```

Verify that the installation runs successfully. Press Ctrl-C to terminate the server.

3. Initialise mock data.
    - Run ```./run.sh```
    - Alternatively, do the following steps:
    - ```python manage.py flush --no-input```: Flushes the current sqlite database to empty state
    - ```python manage.py load_fixtures```: Loads dummy data into the database
    - ```python manage.py runserver```: Runs our server live on port 8000 localhost

### Running Postman
Create a Postman account, in order to send requests and view responses




## Model View Controller Architecture

The sole purpose of the backend application is to take in a request from a client, in the form of ```(Verb, URL, Header, Payload)``` and return response in the form of (Data, Status).

So the backend has to manage the entire lifecycle of the request from the moment it hits the server until the response is given.

In Software Engineering, it is useful to have a certain separation of concern. Instead of coding a 10000-line long file to handle every possible request and response, we group our code in terms of different functionalities, where each group is in charge of single functionality. This is the Single Responsibility Principle. 

Which goes in line with the general guideline to Not Repeat Yourself (no code should ever be duplicated) -> rationale being that it becomes very hard to maintain duplicated code - editing in one place means editing in another

There are many different ways in which one can sub-divide an application into pieces. A common method for Backend services dealing with data (that attempts to model some subset of the "Real World") is the Model-View-Controller architecture.

### Model

In charge of defining the data structures that correspond to our database's schema. A data structure in this context is just a collection of primitive (eg. int, string) fields. For example, in a grocery application, a possible schema involves creating two structs:

```
struct Product
name:String
weight:float

struct Customer
name:String
age:int
```

In Django, this is handled in ```models.py```.

### View

In charge of defining the logical steps that will be taken to get from request to response, for each Endpoint. 

Recall that a request is a tuple of ```(Verb, URL, Header, Payload)```. The semantics of HTTP mean that URL corresponds to the idea of a "location", and the "verb" corresponds to the idea of an action. Therefore, it makes logical sense to group functionality by the Verb and URL. 

This tuple of ```(Verb, URL)``` is an API endpoint. So we create one function per endpoint and do different things based on the payload.

This is handled in ```views.py```. 

### Controller

Controller refers to the dispatcher - how do we route correct URL to the correct view? This is handled by parsing the URL into pieces. This is handled in ```urls.py```.


## Model: How to Represent Real World

When constructing our Model, our big question is **How do we Represent the World**? This is generally non-trivial and is a big part of User Research - figuring out how your client views the world and how they organise and structure their information. 

we create classes to represent an entities, that corresponds to some discrete aspect of the world (fruits, plants, people). The object will contain fields which are pre-defined fields. For example
- Integer Field
- Float Field
- String Field

Then, we can relate entites to one another. For example, we can create a
- Foreign Key (reference to another object, many-to-one relationship)
- Many-to-Many Field (reference to multiple objects, many-to-many relationship)

To decide on what the appropriate data model is, we have to think about the user's requirements and the evolution of the application. Some possible user-research considerations:
- What aspects of the user's data is likely going to change? What will remain static?
- What kinds of constraints are appropriate for the user's data? 
    - Will a Phone number always be an integers?
    - Will the user's full name fit within 100 characters?
- What can be stored / can't be stored, eg. privacy issues?


## View: From Hit to Response

These are the steps involved:
- Parsing the payload + URL
- Performing Data Queries using the ORM
- Returning a response
    - Status Code (200 OK, 404 Not Found, 403 Unauth)
    - Data 
- CRUD:
    - Create
    - Read
    - Update
    - Destroy


- Advanced Topics and Considerations: 
    - Generics
    - Serializers
    - N+1 Query problem
    - Sanitising user input + Authentication (Let's not care about this ATM)


## Practical Demonstration

Create an account on Postman to play with the backend server.

Let us now track what happens from the moment someone sends an API request to the moment it receives a response. Remember the order is request -> urls.py -> views.py -> response.

For this purpose, we will look at trisearch/backend/question. Django groups functionality into "apps". This is just for grouping purposes. You could, in theory, make a Django application using just one "app" and all your code in a super long file. 

First, we look at the model - the data structure of Question and Tag.

Then, go to views.py. Go through each view. Each view+method corresponds to an operation in CRUD. There are in fact 5 operations (CRRUD - read can be read all or read individual).

For each view, send a request in Postman and observe the behaviour of the application. What the application is doing, what gets hit, what the final response looks like. 

What could go wrong? What do we do when something goes wrong? Observe how error handling can be used to catch these illegal requests and handle them gracefully. We use error response codes. The most well-known is 404 when a resource is not found. There are others, like 403, 500, etc, depending on semantics of your application.

Can also use Sqlite Viewer application to view the Database state, observe changes in database.

To reset the database, run ```python manage.py flush```

To load dummy data, run ```python manage.py load_fixtures```

Extension - try using the generic methods provided by DRF.
