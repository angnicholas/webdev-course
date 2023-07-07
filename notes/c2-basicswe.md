# Module 2: The Basic Software Development Toolkit


## Basic SWE 
1. Intro to unix filesytem and commands
    - Directory structure: 
        - user home directory (~) vs root directory (/)
        - absolute ```/path/to/file``` vs relative paths ```./path/to/file```
    - Traversing the directory
        - ```ls, mkdir, cd, touch```
    - Executing commands
        - ```source abc```
        - ```./hi.sh``` executing a bash script that contains commands
    - Permissions (what to do if script is not executable)
        - ```chmod``` 

2. Dependency management in Python
    - Creating venv and managing versions
    - Create 2 different envs, install 2 different versions of popular packages - notice the difference
    - Running ```pip freeze > requirements.txt``` to freeze dependencies and ```pip install -r requirements.txt``` to install from a requirements file
    - Different types of bounds (upper, lower, absolute, none) placed on the dependencies

3. Dependency management in Javascript (package.json)
    - Notice the bounds placed in package.json

## Object-Oriented Programming in Python

This is a massive oversimplification of classes in Python but is all that is required to understand Django

A class is a "blueprint" detailing a collection of state (what it is to be comprised of) and methods (what it can do). An object is an instantiation of a class according to the blueprint.

For example, we can have a car having a property wheels being an integer and drive being a function to drive.

This is how to define a Car in python.

```python
class Car:
    def __init__(self):
        self.wheels = 0
    def drive(self):
        print("Driving")
```

Then you instantiate it with

```python
car = Car()
car.drive() # prints "Driving" 
```

By default, "self", which is a variable referring to the current object instance, is always passed to any method, including the ```__init__()``` constructor, called when running ```Car()```. So when you run ```car.drive()```, the variable self in the drive method gets set to ```car```.

You can also pass arguments to the constructor.

```python
class Car:
    def __init__(self, wheels):
        self.wheels = wheels
    def drive(self):
        print("Driving with", self.wheels)
```

Then you instantiate it with

```python
car = Car(4)
car.drive() # prints "Driving with 4" 
```

You can inherit classes. When you inherit classes you copy all the code written in the parent class, and you can add your own code.

```python
class BlueCar(Car):

```
[Go to Chapter 3](c3-demo-backend.md)