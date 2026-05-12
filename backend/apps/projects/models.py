from __future__ import annotations

from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    name = models.CharField(max_length=40, unique=True)
    slug = models.SlugField(max_length=50, unique=True, blank=True)

    class Meta:
        ordering = ("name",)

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Project(models.Model):
    class Category(models.TextChoices):
        BACKEND = "backend", "Backend"
        FULLSTACK = "fullstack", "Full-stack"
        AUTOMATION = "automation", "Automation"
        INFRA = "infra", "Infrastructure"
        OTHER = "other", "Other"

    title = models.CharField(max_length=140)
    slug = models.SlugField(max_length=160, unique=True, blank=True)
    summary = models.CharField(
        max_length=240,
        help_text="One-line description shown on the index card.",
    )
    description = models.TextField(
        blank=True, help_text="Longer write-up shown on the project detail."
    )
    role = models.CharField(max_length=120, blank=True, default="Engineer")
    year = models.PositiveSmallIntegerField(null=True, blank=True)

    category = models.CharField(
        max_length=20, choices=Category.choices, default=Category.BACKEND
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name="projects")

    cover = models.ImageField(upload_to="projects/", blank=True, null=True)
    repo_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)

    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(
        default=0, help_text="Lower numbers appear first."
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("order", "-year", "-created_at")

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="projects/gallery/")
    caption = models.CharField(max_length=160, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ("order", "id")

    def __str__(self) -> str:
        return f"{self.project.title} — image {self.pk}"
