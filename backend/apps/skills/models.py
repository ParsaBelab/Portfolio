from __future__ import annotations

from django.db import models


class TechCategory(models.Model):
    class Slug(models.TextChoices):
        LANGUAGES = "languages", "Languages"
        BACKEND = "backend", "Backend"
        DATA = "data", "Data & Storage"
        INFRA = "infra", "Infrastructure"
        FRONTEND = "frontend", "Frontend"
        TOOLS = "tools", "Tools"

    name = models.CharField(max_length=60)
    slug = models.CharField(max_length=40, unique=True, choices=Slug.choices)
    description = models.CharField(max_length=200, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ("order", "name")
        verbose_name_plural = "Tech categories"

    def __str__(self) -> str:
        return self.name


class TechItem(models.Model):
    class Level(models.IntegerChoices):
        EXPLORING = 1, "Exploring"
        WORKING = 2, "Working knowledge"
        PROFICIENT = 3, "Proficient"
        EXPERT = 4, "Expert"

    category = models.ForeignKey(
        TechCategory, on_delete=models.CASCADE, related_name="items"
    )
    name = models.CharField(max_length=60)
    level = models.PositiveSmallIntegerField(
        choices=Level.choices, default=Level.PROFICIENT
    )
    note = models.CharField(max_length=160, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ("order", "name")

    def __str__(self) -> str:
        return f"{self.name} ({self.get_level_display()})"
