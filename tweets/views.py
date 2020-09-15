from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet

# Create your views here.


def home(request, *args, **kwargs):
    return HttpResponse("Hello, world. You're at the tweet index.")


def tweet_list_view(request, *args, **kwargs):
    try:
        qs = Tweet.objects.all()
        tweets_list = [x.serialize() for x in qs]
        data = {"response": tweets_list}

    except :
        raise Http404
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    try:
        obj = Tweet.objects.get(id=tweet_id)

    except:
        raise Http404
    data = {"id": tweet_id, "content": obj.content}
    return JsonResponse(data)