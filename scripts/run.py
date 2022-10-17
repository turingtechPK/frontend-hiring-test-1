import sys

# ignore pylance warning: the code is reachable
if sys.version_info[0] < 3:
    print("\nError: Reqired python version 3 and above.\n")
    print("Debugging tips:")
    print("\tpackage.json file has a script called 'gen' which targets python version 3 as such: 'python3'")
    print("\tIf your local python instance is named 'python' then you can add an alias to your '~/.bashrc' or '~/.bash_aliases' as such: alias python3=python\n")
    raise Exception("Python version 3 required")
else:
    from generate import main
    if __name__ == "__main__":
        main()
