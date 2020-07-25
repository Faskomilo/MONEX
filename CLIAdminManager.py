import argparse, sys
# from models.admins import Admins

class Router():
    def __init__(self, args):
        if "-AU" not in args and "--AuthorizingUser" not in args:
            args.append("-AU")
            args.append(input("Please write the Admin's Username that will authorize the action: "))
        if "-AP" not in args and "--AuthorizingPassword" not in args:
            args.append("-AP")
            args.append(input("Please write the Admin's Password that will authorize the action: "))

    def Add(self, args):
        print(args)

    def Modify(self, args):
        print(args)


    def Delete(self, args):
        print(args)


class ArgParser():
    def __init__(self, args):
        self.__args__ = args
        self.definitionArgs()

    def definitionArgs(self):
        RouterIns = Router(self.__args__)

        parser = argparse.ArgumentParser(prog=self.__args__[0], description = "Add, modify or delete an admin")
        subparsers = parser.add_subparsers(metavar = "{command}", title= "Available commands", description="To see how to use each option use : \"" + self.__args__[0] + " {command} -h\" ")
        
        add_parser = subparsers.add_parser("add", description="Add an admin with a username and a password")
        add_parser.add_argument("username", metavar="Username", help="The new Username to be added for login")
        add_parser.add_argument("password", metavar="Password", help="The new Password to be added for login")
        add_parser.add_argument("-AU", "--AuthorizingUser", metavar="Authorizing_User", help="The Username which will be used to authorize the creation of the new user")
        add_parser.add_argument("-AP", "--AuthorizingPassword",  metavar="Authorizing_Password", help="The Password which will be used to authorize the creation of the new user")
        add_parser.set_defaults(func=RouterIns.Add)

        modify_parser = subparsers.add_parser("modify", description="Modify an admin's username or password")
        modify_parser.add_argument("username", metavar="Username", help="The new Username to be added for login")
        modify_parser.add_argument("password", metavar="Password", help="The new Password to be added for login")
        modify_parser.add_argument("-AU", "--AuthorizingUser", metavar="Authorizing_User", help="The Username which will be used to authorize the creation of the new user")
        modify_parser.add_argument("-AP", "--AuthorizingPassword",  metavar="Authorizing_Password", help="The Password which will be used to authorize the creation of the new user")
        modify_parser.set_defaults(func=RouterIns.Modify)

        delete_parser = subparsers.add_parser("delete", description="Delete an admin")
        delete_parser.add_argument("username", metavar="Username", help="The Username to be deleted")
        delete_parser.add_argument("-AU", "--AuthorizingUser", metavar="Authorizing_User", help="The Username which will be used to authorize the creation of the new user")
        delete_parser.add_argument("-AP", "--AuthorizingPassword",  metavar="Authorizing_Password", help="The Password which will be used to authorize the creation of the new user")
        delete_parser.set_defaults(func=RouterIns.Delete)

        del self.__args__[0]
        route = parser.parse_args(self.__args__)
        route.func(route)

if __name__ == "__main__":
    ArgParser(sys.argv)
