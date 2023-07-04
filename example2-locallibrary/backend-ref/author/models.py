from django.db import models

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

    # Setting blank=True creates an optional field.
    # Setting null=True means the value can take on a null value. 
    bio = models.CharField(max_length=100, null=True, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
