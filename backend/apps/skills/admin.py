from django.contrib import admin

from .models import TechCategory, TechItem


class TechItemInline(admin.TabularInline):
    model = TechItem
    extra = 0
    fields = ("name", "level", "note", "order")


@admin.register(TechCategory)
class TechCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    list_editable = ("order",)
    inlines = [TechItemInline]


@admin.register(TechItem)
class TechItemAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "level", "order")
    list_editable = ("level", "order")
    list_filter = ("category", "level")
    search_fields = ("name",)
