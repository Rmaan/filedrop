# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import page.models


class Migration(migrations.Migration):

    dependencies = [
        ('page', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submit',
            name='student_no',
            field=models.CharField(max_length=10, validators=[page.models.sharif_student_no_validator]),
            preserve_default=True,
        ),
    ]
