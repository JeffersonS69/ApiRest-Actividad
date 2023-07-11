from rest_framework import viewsets
from .serializer import PatientSerializer, DiagnoseSerializer
from .models import Patient, Diagnoses

# Create your views here.
class PatientView(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

class DiagnoseView(viewsets.ModelViewSet):
    serializer_class = DiagnoseSerializer
    queryset = Diagnoses.objects.all()
