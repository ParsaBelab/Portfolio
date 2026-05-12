from django.contrib import admin

from .models import Project, ProjectImage, Tag


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 0
    fields = ("image", "caption", "order")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "year", "is_featured", "is_published", "order")
    list_editable = ("is_featured", "is_published", "order")
    list_filter = ("category", "is_featured", "is_published", "tags")
    search_fields = ("title", "summary", "description")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags",)
    inlines = [ProjectImageInline]
    fieldsets = (
        (None, {"fields": ("title", "slug", "summary", "description")}),
        ("Meta", {"fields": ("role", "year", "category", "tags")}),
        ("Links & media", {"fields": ("cover", "repo_url", "live_url")}),
        ("Display", {"fields": ("is_featured", "is_published", "order")}),
    )


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
