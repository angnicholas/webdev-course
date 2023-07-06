from django.core.management.base import BaseCommand
from question.models import Question, HasAQuestion
from tag.models import Tag

class Command(BaseCommand):
    def handle(self, *args, **options):

        

        tag_1 = Tag.objects.create(name='Surface Integration')
        tag_2 = Tag.objects.create(name='Differential Equations')
        tag_3 = Tag.objects.create(name='Hypothesis Testing')
        tag_4 = Tag.objects.create(name='Combinatorics')

        q1 = Question.objects.create(
            part='IA',
            course='Calculus',
            year='2016',
            section='A',
            number='12Q',
            hint='Very difficult!',
        )

        q1.tags.add(tag_1)
        q1.tags.add(tag_2)

        q2 = Question.objects.create(
            part='IA',
            course='Probability',
            year='2017',
            section='B',
            number='13Q',
            hint='too easy!',
        )

        q2.tags.add(tag_3)

        q3 = Question.objects.create(
            part='IA',
            course='Calculus',
            year='2018',
            section='A',
            number='15Q',
            hint='Weird question!',
        )
        q3.tags.add(tag_2)

        # This prevents q3 from being deleted so long as q3 survives.
        # Due to the on_delete property.
        hq_1 = HasAQuestion.objects.create(question=q3)
        




        