from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from patients import views

#api versioning
routerPatient = routers.DefaultRouter()
routerPatient.register(r'patient', views.PatientView, 'patient')

routerDiagnose = routers.DefaultRouter()
routerDiagnose.register(r'diagnose', views.DiagnoseView, 'diagnose')


urlpatterns = [
    path('docs/', include_docs_urls(title="Patients API")),
    path('api/patients/', include(routerPatient.urls)),
    path('api/diagnoses/', include(routerDiagnose.urls)),
    
]