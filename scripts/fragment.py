import pathlib

from mapping import applyMapping, getMapping
from utils import pascalToCamelCase

templateFragment = "scripts/templates/fragment/FRAGMENT_NAME.ts"
templateInterface = "scripts/templates/fragment/FRAGMENT_NAME.interfaces.ts"
templateIndex = "scripts/templates/fragment/index.ts"


def generateFragment(fragmentName, dir):
    fragmentName = pascalToCamelCase(fragmentName)
    print("\n✅ Generating required files/folder:")

    try:
        pathlib.Path(dir).mkdir()
        writeIndex(fragmentName, dir)
        writeFragment(fragmentName, dir)
        writeInterface(fragmentName, dir)
        print("🍺 Done!\n")
    except Exception as e:
        print("\n❌ Error: {}".format(e))


def writeIndex(name, dir):
    with open(dir + "/index.ts", "a") as file, open(templateIndex, "r") as template:
        print("    ✅ Writing to index.ts")
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeFragment(name, dir):
    with open(dir + "/{}.ts".format(name), "a") as file, open(templateFragment, "r") as template:
        print("    ✅ Writing to {}.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeInterface(name, dir):
    with open(dir + "/{}.interfaces.ts".format(name), "a") as file, open(templateInterface, "r") as template:
        print("    ✅ Writing to {}.interfaces.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))
