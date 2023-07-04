# Module 2: The Basic Software Development Toolkit

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
