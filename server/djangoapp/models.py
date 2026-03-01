from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class CarMake(models.Model):
    """
    Model to save data about a car's make.
    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    # You can add other fields like country_of_origin if desired

    def __str__(self):
        return self.name


class CarModel(models.Model):
    """
    Model to save data about a car's model, linked to a CarMake.
    """
    # Many-to-one relationship to CarMake
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE) 
    name = models.CharField(max_length=100)
    
    # Dealer ID refers to a dealer created in the Cloudant/MongoDB database
    dealer_id = models.IntegerField() 

    # Type choices
    SEDAN = 'Sedan'
    SUV = 'SUV'
    WAGON = 'Wagon'
    CAR_TYPES = [
        (SEDAN, 'Sedan'),
        (SUV, 'SUV'),
        (WAGON, 'Wagon'),
    ]
    type = models.CharField(
        max_length=10, 
        choices=CAR_TYPES, 
        default=SEDAN
    )

    # Year with min/max validators
    year = models.IntegerField(
        default=2023,
        validators=[
            MaxValueValidator(2023),
            MinValueValidator(2015)
        ]
    )

    def __str__(self):
        return f"{self.car_make.name} {self.name}"
