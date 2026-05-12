from django.contrib import admin

from .models import CurrentFocusItem, SiteSettings, SocialLink


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Identity", {"fields": ("full_name", "role", "tagline", "location", "available_for_work", "email")}),
        ("Bio & assets", {"fields": ("bio", "avatar", "resume")}),
        ("Stats", {"fields": ("years_coding", "freelance_projects", "personal_projects", "teams_collaborated")}),
    )
    readonly_fields = ()

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "handle", "url", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active", "platform")


@admin.register(CurrentFocusItem)
class CurrentFocusItemAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_active")
    list_editable = ("order", "is_active")
