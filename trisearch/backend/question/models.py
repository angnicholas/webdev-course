from django.db import models
from django.utils.translation import gettext_lazy as _
from tag.models import Tag

# Create your models here.

class HasAQuestion(models.Model):
    # Contrived example to demonstrate the restricting behaviour to
    # ensure Foreign Key Integrity Constraint (Referential Integrity).

    question = models.ForeignKey("Question", on_delete=models.RESTRICT)

class Question(models.Model):

    class PartOfPaper(models.TextChoices):
        FRESHMAN = 'IA', _('Part IA')
        SOPHOMORE = 'IB', _('Part IB')
        JUNIOR = 'II', _('Part II')
        SENIOR = 'TH', _('Part III')

    def get_part_of_paper(self) -> PartOfPaper:
        # Get value from choices enum
        return self.YearInSchool[self.part]

    
    part = models.CharField(
        max_length=2, 
        choices=PartOfPaper.choices,
    )
    
    course = models.CharField(max_length=20)
    year = models.IntegerField()
    section = models.CharField(max_length=20)

    #Not sure how to handle examiner letter here:
    number = models.CharField(max_length=20)
    # examiner = models.CharField(max_length=100)

    hint = models.CharField(max_length=200)
    tags = models.ManyToManyField(to=Tag)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
