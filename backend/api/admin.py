from django.contrib import admin
from .models import BookCategory

# Register your models here.

# admin.site.register(Article)


@admin.register(BookCategory)
class BookCategoryModel(admin.ModelAdmin):
    list_filter = ('name', 'description')
    list_display = ('name', 'description')
