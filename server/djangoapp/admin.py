from django.contrib import admin
from .models import CarMake, CarModel

# Register your models here.

# CarModelInline class allows adding CarModels while editing a CarMake
class CarModelInline(admin.StackedInline):
    model = CarModel
    extra = 5  # Provides 5 empty slots to add models quickly

# CarModelAdmin class
class CarModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'car_make', 'type', 'year', 'dealer_id']
    list_filter = ['type', 'year']
    search_fields = ['name']

# CarMakeAdmin class with CarModelInline
class CarMakeAdmin(admin.ModelAdmin):
    inlines = [CarModelInline]
    list_display = ['name', 'description']
    search_fields = ['name']

# Register models here
admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)
