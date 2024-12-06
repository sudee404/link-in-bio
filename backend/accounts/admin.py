from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import MyUser,Business

@admin.register(MyUser)
class MyUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'username', 'account_type', 'recovery_email','business')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'account_type'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'account_type')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('email',)

class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'phone', 'email')
    search_fields = ('name', 'address', 'phone', 'email')
    
admin.site.register(Business, BusinessAdmin)