import sys
from component import generateComponent
from service import generateService
from fragment import generateFragment
from mutation import generateMutation
from query import generateQuery
from utils import pascalToCamelCase

if sys.argv.__len__() > 1 and sys.argv[1] == "-help":
    print("\nℹ️  Available flags:")
    print("\t-help: Prints this help")
    print("\t-c: Creates a component")
    print("\t-s: Creates a service")
    print("\t-f: Creates a fragment")
    print("\t-m: Creates a mutation")
    print("\t-q: Creates a query\n")
    print("ℹ️  Also each flag needs a pascal case name as the second argument\n")
    sys.exit()

if sys.argv.__len__() < 3:
    print("\n⛔️ Missing arguments!\n")
    print("ℹ️  Please provide a flag and a name")
    print("ℹ️  Try -help for available flags\n")
    sys.exit()

type = sys.argv[1]
name = sys.argv[2]

switchMessage = {
    "-c": {
        "message": "Creating, {} Component...".format(name),
        "dir": "components/{}".format(name),
        "template": generateComponent
    },
    "-s": {
        "message": "Creating, {} Service...".format(name),
        "dir": "services/{}".format(name),
        "template": generateService
    },
    "-f": {
        "message": "Creating, {} Fragment...".format(name),
        "dir": "graphql/fragments/{}".format(pascalToCamelCase(name)),
        "template": generateFragment
    },
    "-m": {
        "message": "Creating, {} Mutation...".format(name),
        "dir": "graphql/mutations/use{}Mutation".format(name),
        "template": generateMutation
    },
    "-q": {
        "message": "Creating, {} Query...".format(name),
        "dir": "graphql/queries/use{}Query".format(name),
        "template": generateQuery
    },
}

selectedOption = switchMessage.get(type, {"message": "Invalid input"})
dir = "src/{}".format(selectedOption.get("dir"))

print(selectedOption.get("message"))


def main():
    if selectedOption.get("template"):
        selectedOption.get("template")(name, dir)
