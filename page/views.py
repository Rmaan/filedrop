from django import forms
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import time
from page.models import Submit, Assignment


class UploadFileForm(forms.ModelForm):
    class Meta:
        model = Submit
        fields = ['email', 'student_no', 'file']


@csrf_exempt
def upload(request):
    # TODO: check file size and type
    frm = UploadFileForm(request.POST, request.FILES)
    if not frm.is_valid():
        return JsonResponse({'error': frm.errors})

    submit = frm.save(commit=False)
    submit.assignment, _ = Assignment.objects.get_or_create(name='HW3')
    submit.time = time.time()
    submit.save()

    res = JsonResponse({'success': True})
    if 'application/json' not in request.META['HTTP_ACCEPT']:
        # INTERNET EXPLORER!!
        res['Content-Type'] = 'text/plain'
    return res
