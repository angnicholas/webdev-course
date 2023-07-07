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

## Functions as values

Functions can be passed around as values. This is very important in most modern high-level programming languages as it allows for delayed evaluation. 

```python
def doStuff(x, callback):
    y = x * 2
    callback(y)

def myCallback(num):
    print(num ** 2)

doStuff(4, myCallback) # Prints 64.
```

It is useful because now I can do things concurrently using asynchronous logic. For example, let's say doStuff takes 10 minutes to run. Instead of blocking my whole program like this

```python
y = x * 2 #10 minutes
print(y ** 2) # blocks the entire thread for 10 minutes, then prints 64.
print("Hello") # prints hello
```

I can instead do this
```python
doStuff(4, myCallback) #sends a request for computation which will go off on its own
print("Hello") # prints hello
# 10 minutes in the future, prints 64
```

So this gives me the ability to do other things (eg. print stuff to the UI) while something slow is happening (eg. loading a request).

The exact way to do this is using async and await keywords. The implementation is probably quite complex because there are now multiple contexts of execution. Concurrency is quite difficult to handle in general. But the main thing to note is just that sometimes esp. for frontend UI stuff you have to pass in functions to tell the system what to do when a request is fulfilled. And note that the order of execution would appear different from what you would expect.

[Go to Chapter 3](c3-demo-backend.md)