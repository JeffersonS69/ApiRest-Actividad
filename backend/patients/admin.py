from django.contrib import admin
from .models import Diagnoses, Patient

# Register your models here.
admin.site.register(Patient)
admin.site.register(Diagnoses)