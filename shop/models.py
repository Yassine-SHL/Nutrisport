from django.db import models


class Category(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    active = models.BooleanField(default=True)

    category = models.ForeignKey('shop.Category', on_delete=models.CASCADE, related_name='products')

    calories = models.IntegerField(null=True, help_text="Calories pour 100g")
    protein = models.DecimalField(max_digits=5, decimal_places=2, null=True, help_text="Protéines pour 100g")
    carbs = models.DecimalField(max_digits=5, decimal_places=2, null=True, help_text="Glucides pour 100g")
    fat = models.DecimalField(max_digits=5, decimal_places=2, null=True, help_text="Lipides pour 100g")

    vegetarian = models.BooleanField(default=False)
    gluten_free = models.BooleanField(default=False)

    image = models.ImageField(upload_to='products/', null=True, blank=True, help_text="Image du produit")

    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00,
                                help_text="Prix du produit")  # Nouveau champ de prix

    def __str__(self):
        return self.name


class Article(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, help_text="Prix de l'article")

    product = models.ForeignKey('shop.Product', on_delete=models.CASCADE, related_name='articles')

    calories = models.IntegerField(null=True, help_text="Calories pour une portion")
    protein = models.DecimalField(max_digits=5, decimal_places=2, null=True, help_text="Protéines pour une portion")
    carbs = models.DecimalField(max_digits=5, decimal_places=2, null=True, help_text="Glucides pour une portion")
    fat = models.DecimalField(max_digits=5, decimal_places=2, null=True, help_text="Lipides pour une portion")

    vegetarian = models.BooleanField(default=False)
    gluten_free = models.BooleanField(default=False)

    image = models.ImageField(upload_to='articles/', null=True, blank=True, help_text="Image de l'article")

    def __str__(self):
        return self.name