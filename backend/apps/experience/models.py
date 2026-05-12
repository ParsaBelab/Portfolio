from __future__ import annotations

from django.db import models


class Experience(models.Model):
    role = models.CharField(max_length=140)
    company = models.CharField(max_length=140)
    location = models.CharField(max_length=120, blank=True)
    summary = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True, help_text="Empty = present.")
    is_current = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ("order", "-start_date")

    def __str__(self) -> str:
        return f"{self.role} · {self.company}"
