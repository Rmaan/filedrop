from django import forms
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class UploadFileForm(forms.Form):
    file = forms.FileField()


@csrf_exempt
def upload(request):
    # TODO: check file size and type
    frm = UploadFileForm(request.POST, request.FILES)
    if not frm.is_valid():
        return JsonResponse({'error': frm.errors})
    file = request.FILES['file']
    # s = StoredImage(albumTag=1, filename=file.name, originalImage=file)

    res = JsonResponse({'success': True})
    if 'application/json' not in request.META['HTTP_ACCEPT']:
        # INTERNET EXPLORER!!
        res['Content-Type'] = 'text/plain'
    return res
