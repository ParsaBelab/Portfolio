from __future__ import annotations

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.experience.models import Experience
from apps.projects.models import Project
from apps.skills.models import TechCategory

from .models import SiteSettings
from .serializers import (
    ExperienceSerializer,
    ProjectDetailSerializer,
    ProjectListSerializer,
    SiteSettingsSerializer,
    TechCategorySerializer,
)


class SiteView(APIView):
    """Site-level metadata: identity, stats, socials, current focus."""

    def get(self, request):
        obj = SiteSettings.load()
        serializer = SiteSettingsSerializer(obj, context={"request": request})
        return Response(serializer.data)


class ProjectListView(APIView):
    def get(self, request):
        qs = (
            Project.objects.filter(is_published=True)
            .prefetch_related("tags")
        )
        serializer = ProjectListSerializer(qs, many=True, context={"request": request})
        return Response(serializer.data)


class ProjectDetailView(APIView):
    def get(self, request, slug: str):
        project = get_object_or_404(
            Project.objects.prefetch_related("tags", "images"),
            slug=slug,
            is_published=True,
        )
        serializer = ProjectDetailSerializer(project, context={"request": request})
        return Response(serializer.data)


class ExperienceListView(APIView):
    def get(self, request):
        qs = Experience.objects.all()
        serializer = ExperienceSerializer(qs, many=True)
        return Response(serializer.data)


class SkillsView(APIView):
    def get(self, request):
        qs = TechCategory.objects.prefetch_related("items").all()
        serializer = TechCategorySerializer(qs, many=True)
        return Response(serializer.data)


class ResumeView(APIView):
    def get(self, request):
        site = SiteSettings.load()
        if not site.resume:
            return Response({"detail": "No resume uploaded."}, status=status.HTTP_404_NOT_FOUND)
        return Response(
            {
                "url": request.build_absolute_uri(site.resume.url),
                "updated_at": site.updated_at,
                "filename": site.resume.name.rsplit("/", 1)[-1],
            }
        )
