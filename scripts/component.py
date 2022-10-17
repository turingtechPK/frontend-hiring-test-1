import pathlib

from mapping import applyMapping, getMapping

templateComponent = "scripts/templates/component/COMPONENT_NAME.tsx"
templateInterface = "scripts/templates/component/COMPONENT_NAME.interface.ts"
templateIndex = "scripts/templates/component/index.ts"


def generateComponent(componentName, dir):
    print("\n✅ Generating required files/folder:")

    try:
        pathlib.Path(dir).mkdir()
        writeIndex(componentName, dir)
        writeComponent(componentName, dir)
        writeInterface(componentName, dir)
        # writeModule(componentName, dir)
        print("🍺 Done!\n")
    except Exception as e:
        print("\n❌ Error: {}".format(e))


def writeIndex(name, dir):
    with open(dir + "/index.ts", "a") as file, open(templateIndex, "r") as template:
        print("    ✅ Writing to index.ts")
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeComponent(name, dir):
    with open(dir + "/{}.tsx".format(name), "a") as file, open(templateComponent, "r") as template:
        print("    ✅ Writing to {}.tsx".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeInterface(name, dir):
    with open(dir + "/{}.interface.ts".format(name), "a") as file, open(templateInterface, "r") as template:
        print("    ✅ Writing to {}.interface.ts".format(name))
        for line in template:
            file.write(applyMapping(line, getMapping(name)))


def writeModule(name, dir):
    print("    ✅ Creating {}.module.scss\n".format(name))
    open(dir + "/{}.module.scss".format(name), "x")
