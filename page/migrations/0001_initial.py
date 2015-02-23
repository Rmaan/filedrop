# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import page.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=250)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Submit',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.EmailField(max_length=250, null=True, blank=True)),
                ('student_no', models.CharField(max_length=8, validators=[page.models.sharif_student_no_validator])),
                ('time', models.IntegerField()),
                ('file', models.FileField(upload_to=b'submits')),
                ('assignment', models.ForeignKey(to='page.Assignment')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
