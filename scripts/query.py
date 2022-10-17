import pathlib

from mapping import applyMapping, getMapping

templateQuery = "scripts/templates/query/QUERY_NAME.ts"
templateInterface = "scripts/templates/query/QUERY_NAME.interfaces.ts"
templateIndex = "scripts/templates/query/index.ts"


def generateQuery(queryName, dir):
    print("\n✅ Generating required files/folder:")

    try:
        pathlib.Path(dir).mkdir()
        writeIndex(queryName, dir)
        writeQuery(queryName, dir)
        writeInterface(queryName, dir)
        print("🍺 Done!\n")
    except Exception as e:
        print("\n❌ Error: {}".format(e))


def writeIndex(name, dir):
    with open(dir + "/index.ts", "a") as file, open(templateIndex, "r") as template:
        print("    ✅ Writing to index.ts")
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeQuery(name, dir):
    with open(dir + "/use{}Query.ts".format(name), "a") as file, open(templateQuery, "r") as template:
        print("    ✅ Writing to use{}Query.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeInterface(name, dir):
    with open(dir + "/use{}Query.interfaces.ts".format(name), "a") as file, open(templateInterface, "r") as template:
        print("    ✅ Writing to use{}Query.interfaces.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))
