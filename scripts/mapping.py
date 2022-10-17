from functools import reduce

from utils import camelToPascalCase, camelToSnakeCase, pascalToCamelCase


def getMapping(inputName):
    name = camelToPascalCase(inputName)
    return {
        'COMPONENT_NAME': name,
        'COMPONENT_PROPS': '{}Props'.format(name),
        'SERVICE_NAME': pascalToCamelCase(name),
        'SERVICE_INTERFACE': name,
        'FRAGMENT_NAME': name,
        'FRAGMENT_SUFFIX': '{}Fragment'.format(name),
        'FRAGMENT_SNAKE': camelToSnakeCase('{}Fragment'.format(inputName)).upper(),
        'FRAGMENT_TYPE': name,
        'QUERY_NAME': 'use{}Query'.format(name),
        'QUERY_SNAKE': camelToSnakeCase('{}Query'.format(inputName)).upper(),
        'QUERY_CAMEL': pascalToCamelCase(inputName),
        'QUERY_RETURN_DATA': '{}QueryData'.format(name),
        'QUERY_INPUT_VARIABLES': '{}QueryVariables'.format(name),
        'MUTATION_NAME': 'use{}Mutation'.format(name),
        'MUTATION_SNAKE': camelToSnakeCase('{}Mutation'.format(inputName)).upper(),
        'MUTATION_CAMEL': pascalToCamelCase(inputName),
        'MUTATION_RETURN_DATA': '{}MutationData'.format(name),
        'MUTATION_INPUT_VARIABLES': '{}MutationVariables'.format(name),
    }


def applyMapping(line, replacements):
    return reduce(lambda a, kv: a.replace(*kv), replacements.items(), line)
