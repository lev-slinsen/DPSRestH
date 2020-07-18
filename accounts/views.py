from django.http import request
from django.shortcuts import render
from django.views.generic import TemplateView


class UserView(TemplateView):
    """
    Creates template variable for admin rights check.
    """
    template = 'index.html'
    user = {
        isAdmin: request.user.is_admin
    }
    render(template, request, {user: user})
