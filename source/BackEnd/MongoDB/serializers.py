from rest_framework import serializers
from MongoDB.models import ExtractFIle, User, Document, Field, File, AllReport, Report


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class ModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = '__all__'


class FieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = Field
        fields = '__all__'


class ExtractSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExtractFIle
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = '__all__'

class AllReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = AllReport
        fields = '__all__'
