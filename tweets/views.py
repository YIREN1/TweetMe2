from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet

# Create your views here.


def home(request, *args, **kwargs):
    return HttpResponse("Hello, world. You're at the tweet index.")
