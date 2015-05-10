from collections import defaultdict
import os
from django.core.management.base import BaseCommand
from page.models import Assignment, Submit
from django.conf import settings
import shutil


class Command(BaseCommand):
    args = '<assignment_name>'

    def handle(self, assignment_name, *args, **options):
        assignment = Assignment.objects.get(name=assignment_name)
        submits = defaultdict(list)
        for s in Submit.objects.filter(assignment=assignment).order_by('time'):
            submits[s.student_no].append(s)

        # tof tof tof
        deadline = {
            'hw1': 1425932999,
            'hw2': 1428780599,
            'hw3': 1431372599,
        }[assignment_name]

        media_root = settings.MEDIA_ROOT
        if len(media_root) <= 2:
            print 'media root is shitty! set it'
            return

        dir = media_root + '/result/' + assignment_name
        try:
            shutil.rmtree(dir)
        except (IOError, OSError):
            pass

        for student_no in submits.keys():
            os.makedirs(dir + '/' + student_no)
            print 'student!', student_no

            for idx, s in enumerate(submits[student_no], 1):
                late_minutes = int((s.time - deadline) / 60)
                late_str = "" if late_minutes <= 0 else "[{}mins-late]".format(late_minutes)
                try:
                    shutil.copyfile("{}/{}".format(media_root, s.file),
                                    "{}/{}/{}{}.pdf".format(dir, s.student_no, idx, late_str))
                except IOError as e:
                    print e
