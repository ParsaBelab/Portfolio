from django.urls import path

from .views import (
    ExperienceListView,
    ProjectDetailView,
    ProjectListView,
    ResumeView,
    SiteView,
    SkillsView,
)

app_name = "api"

urlpatterns = [
    path("site/", SiteView.as_view(), name="site"),
    path("projects/", ProjectListView.as_view(), name="projects"),
    path("projects/<slug:slug>/", ProjectDetailView.as_view(), name="project-detail"),
    path("experience/", ExperienceListView.as_view(), name="experience"),
    path("skills/", SkillsView.as_view(), name="skills"),
    path("resume/", ResumeView.as_view(), name="resume"),
]
