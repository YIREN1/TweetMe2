from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Tweet

from ..serializers import TweetSerializer, TweetCreateSerializer


@api_view(["POST"])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


def tweet_list_view(request, *args, **kwargs):
    try:
        qs = Tweet.objects.all()
        tweets_list = [x.serialize() for x in qs]
        data = {"response": tweets_list}

    except:
        raise Http404
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    try:
        obj = Tweet.objects.get(id=tweet_id)

    except:
        raise Http404
    data = {"id": tweet_id, "content": obj.content}
    return JsonResponse(data)