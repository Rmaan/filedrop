import re

from django.core.exceptions import ValidationError
from django.db import models


_student_no_regex = re.compile('^\d{8}$')


def sharif_student_no_validator(value):
    if not _student_no_regex.match(value):
        raise ValidationError('Invalid Sharif student number.')


class Assignment(models.Model):
    name = models.CharField(max_length=250)


class Submit(models.Model):
    assignment = models.ForeignKey(Assignment)
    email = models.EmailField(max_length=250, null=True, blank=True)
    student_no = models.CharField(max_length=10, validators=[sharif_student_no_validator])
    time = models.IntegerField()
    file = models.FileField(upload_to=u'submits')
