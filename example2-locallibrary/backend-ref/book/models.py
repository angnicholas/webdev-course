from django.db import models
from author.models import Author

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=100)
    pages = models.IntegerField()

    # Create a foreign key to the Author model
    # Specify what happens if the Author object gets deleted
    # RESTRICT: Don't allow the deletion
    # CASCADE: Delete the Book that is referencing the author.
    author = models.ForeignKey(Author, on_delete=models.RESTRICT)