from django.urls import path

from . import views

urlpatterns = [
    path('', views.tweet_list_view, name='list'),
    path('<int:tweet_id>/', views.tweet_detail_view, name='detail'),

]