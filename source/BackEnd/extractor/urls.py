"""extractor URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from MongoDB import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user', views.user),
    path('user/<username>/<password>', views.user_detail),
    path('model_field',views.model_field),
    path('model', views.model),
    path('model/<modelname>', views.model_detail),
    path('report', views.report),
    path('report/<reportname>', views.report_detail),
    path('field', views.field),
    path('field/<modelname>', views.field_detail),
    path('upload/', views.upload),
    path('gettext/', views.text),
    path('savemodel', views.savemodel),
    path('uploadfiles', views.uploadfiles),
    path('extractValesAll', views.extractValesAll),
    path('dashboard', views.dashboard),
    path('download/<date>/<reportname>', views.downloadFiles)


]+static(settings.MEDIA_ROOT, document_root=settings.MEDIA_ROOT)
