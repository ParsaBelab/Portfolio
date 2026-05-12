from __future__ import annotations

from rest_framework import serializers

from apps.experience.models import Experience
from apps.projects.models import Project, ProjectImage, Tag
from apps.skills.models import TechCategory, TechItem

from .models import CurrentFocusItem, SiteSettings, SocialLink


class SocialLinkSerializer(serializers.ModelSerializer):
    platform_label = serializers.CharField(source="get_platform_display", read_only=True)

    class Meta:
        model = SocialLink
        fields = ("platform", "platform_label", "handle", "url", "order")


class CurrentFocusItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentFocusItem
        fields = ("id", "title", "description", "order")


class SiteSettingsSerializer(serializers.ModelSerializer):
    social_links = serializers.SerializerMethodField()
    current_focus = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()
    avatar_url = serializers.SerializerMethodField()
    stats = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = (
            "full_name", "role", "tagline", "location", "available_for_work",
            "bio", "email", "stats", "resume_url", "avatar_url",
            "social_links", "current_focus", "updated_at",
        )

    def get_stats(self, obj: SiteSettings) -> dict[str, int]:
        return {
            "years_coding": obj.years_coding,
            "freelance_projects": obj.freelance_projects,
            "personal_projects": obj.personal_projects,
            "teams_collaborated": obj.teams_collaborated,
        }

    def get_resume_url(self, obj: SiteSettings) -> str | None:
        return obj.resume.url if obj.resume else None

    def get_avatar_url(self, obj: SiteSettings) -> str | None:
        return obj.avatar.url if obj.avatar else None

    def get_social_links(self, obj: SiteSettings):
        qs = SocialLink.objects.filter(is_active=True)
        return SocialLinkSerializer(qs, many=True).data

    def get_current_focus(self, obj: SiteSettings):
        qs = CurrentFocusItem.objects.filter(is_active=True)
        return CurrentFocusItemSerializer(qs, many=True).data


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("name", "slug")


class ProjectImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = ProjectImage
        fields = ("image", "caption", "order")


class ProjectListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    category_label = serializers.CharField(source="get_category_display", read_only=True)
    cover = serializers.ImageField(read_only=True)

    class Meta:
        model = Project
        fields = (
            "id", "title", "slug", "summary", "role", "year",
            "category", "category_label", "tags", "cover",
            "repo_url", "live_url", "is_featured",
        )


class ProjectDetailSerializer(ProjectListSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta(ProjectListSerializer.Meta):
        fields = ProjectListSerializer.Meta.fields + ("description", "images")


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = (
            "id", "role", "company", "location", "summary",
            "start_date", "end_date", "is_current", "order",
        )


class TechItemSerializer(serializers.ModelSerializer):
    level_label = serializers.CharField(source="get_level_display", read_only=True)

    class Meta:
        model = TechItem
        fields = ("name", "level", "level_label", "note", "order")


class TechCategorySerializer(serializers.ModelSerializer):
    items = TechItemSerializer(many=True, read_only=True)

    class Meta:
        model = TechCategory
        fields = ("name", "slug", "description", "order", "items")
