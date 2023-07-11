from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from datetime import date
from django.utils.html import format_html

def validate_even(value):
    if value < 0 or value > 100:
        raise ValidationError(
            _("El valor está fuera de rango entre [0 - 100]: %(value)s"),
            params = {"value": value},
        )

# Create your models here.
class Patient(models.Model):
    GENDER_CHANGE = [
        ("Masculino", "M"),
        ("Femenino", "F")
    ]
    firtname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    birthdate = models.DateField()
    gender = models.CharField(max_length=9, choices=GENDER_CHANGE)
    address = models.TextField(blank=False)
    phonenumber = models.CharField(max_length=10)
    image = models.ImageField(null=True, blank=True, upload_to="personas/",default="personas/persona.jpg")

    def __str__(self):
        return f"{self.firtname} {self.lastname}"
    
    def mostrar_imagen(self):
        if self.image:
            return format.html('<img src= "{}" width="100" height="100"/>'.format(self.image.url))
        else:
            return ''



class Diagnoses(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date_diagnosis = models.DateField(default=date.today())
    sugar_level = models.DecimalField(validators=[validate_even],max_digits=5,decimal_places=2)
    fat_level = models.DecimalField(validators=[validate_even],max_digits=5,decimal_places=2)
    oxygen_level = models.DecimalField(validators=[validate_even],max_digits=5,decimal_places=2)
    risk_level = models.CharField(max_length=5,blank=True, null=True)

    @classmethod
    def calculate_risk_level(cls, sugar_level, fat_level, oxygen_level):
        if sugar_level > 70 and fat_level > 88.5 and oxygen_level < 60:
            return "Alto"
        if 50 <= sugar_level <= 70 and 62.2 <= fat_level <= 88.5 and  60 <= oxygen_level <= 70:
            return "Medio"
        if (sugar_level < 50 and fat_level < 62.2 and oxygen_level > 70):
            return "Bajo"
        
    def save(self, *args, **kwargs):
        self.risk_level = self.calculate_risk_level(self.sugar_level, self.fat_level, self.oxygen_level)
        super().save(*args, **kwargs)




    def __str__(self):
        return f"Paciente: {self.patient.firtname} {self.patient.lastname}, Diagnóstico: {self.risk_level}"


