from django.db import models

# Create your models here.

from django.contrib.auth.models import User


class carfueltype_model(models.Model):
    fueltype = models.CharField(max_length=20, null=False)

    def __str__(self):
        return self.fueltype

class cargeartype_model(models.Model):
    geartype = models.CharField(max_length=20, null=False)

    def __str__(self):
        return self.geartype

class Car_Status_Model(models.Model):
    post_status = models.CharField(max_length=20, null=False)
    def __str__(self):
        return self.post_status

class Car_Detail_Model(models.Model):
    model = models.CharField(max_length=100, null=False)
    colour = models.CharField(max_length=50, null=False)
    year = models.IntegerField(null=False)
    price = models.DecimalField(max_digits=10,decimal_places=2,null=False)
    fueltype = models.ForeignKey(carfueltype_model, on_delete=models.CASCADE, null=False, )
    geartype = models.ForeignKey(cargeartype_model, on_delete=models.CASCADE, null=False)
    created_at = models.DateTimeField(auto_now_add=True,null=False )
    carlocation = models.CharField(max_length=50, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post_status = models.ForeignKey(Car_Status_Model,default=2, on_delete=models.CASCADE)

    def __str__(self,):
        return self.model

    
class Car_Buy_Model(models.Model):
    name = models.CharField(max_length=50 , null=False)
    phonenumber = models.CharField(null = False, max_length=11)
    emailid = models.EmailField(null=False)
    car = models.ForeignKey(Car_Detail_Model,on_delete=models.CASCADE)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)  

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['car', 'buyer'],
                name='carid_and_userid'
            )
        ]
    def __str__(self):
        return self.name



