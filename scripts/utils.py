import re


def camelToSnakeCase(name):
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', name)


def pascalToCamelCase(name):
    return name[:1].lower() + name[1:] if name else ''


def camelToPascalCase(name):
    return name[:1].upper() + name[1:] if name else ''
