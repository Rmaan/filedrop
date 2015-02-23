from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.shortcuts import render

urlpatterns = patterns('',
    url(r'^$', lambda req: render(req, 'index.html')),
    url(r'^api/upload/', 'page.views.upload'),

    url(r'^admin/', include(admin.site.urls)),
)
