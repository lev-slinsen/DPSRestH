"""
Accounts forms.
"""
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from accounts.models import User


class UserAdminCreationForm(UserCreationForm):
    """
    A form for creating new accounts. Includes phone and a repeated password.
    """
    class Meta:
        model = User
        fields = ('phone',)
        field_classes = {'phone': forms.CharField}


class UserAdminChangeForm(UserChangeForm):
    """
    A form for updating accounts.

    Includes all the fields on the user, but replaces the password field with admin's password hash display field.
    """
    class Meta:
        model = User
        fields = '__all__'
        field_classes = {'phone': forms.CharField}
