"""Site-wide singletons: profile, social links, resume, current-focus."""
from __future__ import annotations

from django.core.exceptions import ValidationError
from django.db import models


class SiteSettings(models.Model):
    """Singleton row holding hero copy and personal metadata."""

    full_name = models.CharField(max_length=120, default="Parsa Belab")
    role = models.CharField(max_length=160, default="Backend Developer")
    tagline = models.CharField(
        max_length=240,
        default="Backend Developer focused on clean architecture and system reliability.",
    )
    location = models.CharField(max_length=120, blank=True, default="Remote")
    available_for_work = models.BooleanField(default=True)
    bio = models.TextField(
        blank=True,
        help_text="Long-form about copy. Markdown-light: blank lines separate paragraphs.",
    )
    email = models.EmailField(default="work.parsabelab@gmail.com")

    years_coding = models.PositiveSmallIntegerField(default=4)
    freelance_projects = models.PositiveSmallIntegerField(default=5)
    personal_projects = models.PositiveSmallIntegerField(default=20)
    teams_collaborated = models.PositiveSmallIntegerField(default=3)

    resume = models.FileField(upload_to="resume/", blank=True, null=True)
    avatar = models.ImageField(upload_to="avatar/", blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site settings"
        verbose_name_plural = "Site settings"

    def __str__(self) -> str:
        return self.full_name

    def clean(self) -> None:
        if SiteSettings.objects.exclude(pk=self.pk).exists():
            raise ValidationError("Only one SiteSettings row is permitted.")

    @classmethod
    def load(cls) -> "SiteSettings":
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class SocialLink(models.Model):
    class Platform(models.TextChoices):
        GITHUB = "github", "GitHub"
        LINKEDIN = "linkedin", "LinkedIn"
        X = "x", "X / Twitter"
        TELEGRAM = "telegram", "Telegram"
        EMAIL = "email", "Email"
        WEBSITE = "website", "Website"

    platform = models.CharField(max_length=20, choices=Platform.choices, unique=True)
    handle = models.CharField(max_length=120, blank=True)
    url = models.URLField()
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("order", "platform")

    def __str__(self) -> str:
        return f"{self.get_platform_display()} — {self.handle or self.url}"


class CurrentFocusItem(models.Model):
    """The 'currently working on' block."""

    title = models.CharField(max_length=120)
    description = models.CharField(max_length=240, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("order", "id")
        verbose_name = "Current focus item"

    def __str__(self) -> str:
        return self.title
