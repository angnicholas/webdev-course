# Generated by Django 4.2.2 on 2023-07-06 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tag', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('part', models.CharField(choices=[('IA', 'Part IA'), ('IB', 'Part IB'), ('II', 'Part II'), ('TH', 'Part III')], max_length=2)),
                ('course', models.CharField(max_length=20)),
                ('year', models.IntegerField()),
                ('section', models.CharField(max_length=20)),
                ('number', models.CharField(max_length=20)),
                ('hint', models.CharField(max_length=200)),
                ('tags', models.ManyToManyField(to='tag.tag')),
            ],
        ),
    ]