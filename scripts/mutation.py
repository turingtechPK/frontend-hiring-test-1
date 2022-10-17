import pathlib

from mapping import applyMapping, getMapping

templateMutation = "scripts/templates/mutation/MUTATION_NAME.ts"
templateInterface = "scripts/templates/mutation/MUTATION_NAME.interfaces.ts"
templateIndex = "scripts/templates/mutation/index.ts"


def generateMutation(mutationName, dir):
    print("\n✅ Generating required files/folder:")

    try:
        pathlib.Path(dir).mkdir()
        writeIndex(mutationName, dir)
        writeMutation(mutationName, dir)
        writeInterface(mutationName, dir)
        print("🍺 Done!\n")
    except Exception as e:
        print("\n❌ Error: {}".format(e))


def writeIndex(name, dir):
    with open(dir + "/index.ts", "a") as file, open(templateIndex, "r") as template:
        print("    ✅ Writing to index.ts")
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeMutation(name, dir):
    with open(dir + "/use{}Mutation.ts".format(name), "a") as file, open(templateMutation, "r") as template:
        print("    ✅ Writing to use{}Mutation.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeInterface(name, dir):
    with open(dir + "/use{}Mutation.interfaces.ts".format(name), "a") as file, open(templateInterface, "r") as template:
        print("    ✅ Writing to use{}Mutation.interfaces.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))
