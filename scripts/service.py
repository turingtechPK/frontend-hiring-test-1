import pathlib

from mapping import applyMapping, getMapping

templateService = "scripts/templates/service/SERVICE_NAMEApi.ts"
templateInterface = "scripts/templates/service/SERVICE_NAME.interfaces.ts"
templateIndex = "scripts/templates/service/index.ts"


def generateService(serviceName, dir):
    print("\n✅ Generating required files/folder:")

    try:
        pathlib.Path(dir).mkdir()
        writeIndex(serviceName, dir)
        writeService(serviceName, dir)
        writeInterface(serviceName, dir)
        print("🍺 Done!\n")
    except Exception as e:
        print("\n❌ Error: {}".format(e))


def writeIndex(name, dir):
    with open(dir + "/index.ts", "a") as file, open(templateIndex, "r") as template:
        print("    ✅ Writing to index.ts")
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeService(name, dir):
    with open(dir + "/{}Api.ts".format(name), "a") as file, open(templateService, "r") as template:
        print("    ✅ Writing to {}.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeInterface(name, dir):
    with open(dir + "/{}.interfaces.ts".format(name), "a") as file, open(templateInterface, "r") as template:
        print("    ✅ Writing to {}.interfaces.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))
