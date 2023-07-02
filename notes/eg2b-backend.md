# Example Set 2B. Local Library Backend Walkthrough

Follow these steps to build the Local Library site in a fresh directory. The finished code, for reference, is located in the ```example2-locallibrary/``` folder which you can refer to if you get stuck.

## 1 Modelling (Paper work)

1. Define a data model for a Library consisting of 2 objects: Books and Authors, with a foreign-key relationship.

2. Define the API. Let's do three arbitrary queries first as an example, then we can do up the rest (CRUD-like) later.
    - Get all books written by Author with ID1
    - Get all books 
    - Edit the author of a book

## 2 Setup

1. Create a fresh directory for your project, and set that directory as your current working directory.
```mkdir backend-worked```
```cd backend-worked```

2. Create a new python environment. Install ```django```.

3. Initialise your project with ```django-admin startproject locallibrary .``` The ```.``` means to create the project in the current working directory rather than creating a subfolder for hte project.

4. Initialise the book app with ```django-admin startapp book```

5. Initialise the author app with ```django-admin startapp author```

6. Add ```author``` and ```book``` to the list of INSTALLED_APPS in ```settings.py```

7. Verify this works by running ```python manage.py runserver```

8. Run migration. Migrations are necessary whenever the data model changes as the app goes along (since we are changing our database schema). It can cause errors eg. when we make a breaking change -> so sometimes we need to delete all the migrations and start afresh which is annoying. Since we are initialising the database, it is a change.
    - ```python manage.py makemigrations```: Defines the operations needed to migrate data to new schema
    - ```python manage.py migrate```: Executes the operations

9. Rerun ```python manage.py runserver``` Now you should see:

![result](./task2-001.PNG)

10. Create a readme file in the root directory of the project to remind yourself of how to run the project.

11. Create a requirements.txt file by using ```pip freeze``` or typing in manualy.


## Data Modelling in Code

1. In ```book/models.py``` create a ```book``` object with the following fields:
- ```title:String```
- ```author:Foreign Key to Author```
- ```pages:int```

2. In ```author/models.py``` create an ```author``` object with the following fields
- ```name:String```
- ```age:int```

## Endpoint 

1. Implement the endpoints.

