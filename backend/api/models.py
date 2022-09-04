from django.db import models

# Create your models here.


def upload_location(instance, filename, **kwargs):
    file_path = 'frontend/src/files/{book_slug}/{filename}'.format(
        book_slug=str(instance.slug),
        title=str(instance.name),
        filename=filename
    )
    return file_path


class BookCategory(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField(max_length=5000, null=True, blank=True)
    slug = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return self.name


class BookLocation(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField(max_length=5000, null=True, blank=True)
    slug = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField(max_length=5000, null=True, blank=True)
    image = models.ImageField(upload_to=upload_location, null=True, blank=True)
    bookImage = models.CharField(max_length=200, null=True, blank=True)
    date_published = models.DateTimeField(
        auto_now_add=True, verbose_name="date published")
    date_updated = models.DateTimeField(
        auto_now=True, verbose_name="date updated")
    author = models.CharField(max_length=50, null=True, blank=True)
    quantity = models.IntegerField()
    slug = models.SlugField(blank=True, unique=True)
    category = models.ManyToManyField(BookCategory)
    location = models.ManyToManyField(BookLocation)

    def __str__(self):
        return self.name
