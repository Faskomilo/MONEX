import argparse, sys, hashlib
from models.Admins import Admins

class Router():
    def __init__(self, args):
        if "-AU" not in args and "--AuthorizingUser" not in args:
            if ("-v" or "--verbose") in args:
                args.append("-AU")
                args.append(input("Write the Admin's Username that will authorize the action: "))
            elif "-h" or "--help" in args:
                pass
            else:
                print("** Error: Missing Authorizing Admin's Username **")
                sys.exit()
        if "-AP" not in args and "--AuthorizingPassword" not in args and ("-v" or "--verbose") in args:
            if ("-v" or "--verbose") in args:
                args.append("-AP")
                args.append(input("Write the Admin's Password that will authorize the action: "))
            elif "-h" or "--help" in args:
                    pass
            else:
                print("** Error: Missing Authorizing Admin's Password **")
                sys.exit()
            

    def Add(self, args):
        print("")
        _authorizingAdmin = Admins.get(Admins.username == args.AuthorizingUser)
        if _authorizingAdmin is not None:
            _password = args.AuthorizingPassword
            _password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
            if _authorizingAdmin.password  == _password:
                _newAdmin = Admins.get(Admins.username == args.username)
                if _newAdmin is None:
                    if len(_password) < 5:
                        if args.verbose:
                            passwordOK = False
                            while not passwordOK:
                                _password = input("Please, enter a valid password over 5 characters: ")
                                if len(_password) >= 5:
                                    passwordOK = True
                        else:
                            print("** Error: Password must be over 5 characters **")
                    _newAdminPassword = hashlib.sha224(str(args.password).encode('utf-8')).hexdigest()
                    _newAdmin = Admins(username = args.username,
                                    password = _newAdminPassword)
                    if _newAdmin.save():
                        print("Admin saved correctly")
                    else:
                        print("** Error: Admin could not be saved **")
                else:
                    print("** Error: Admin already exists **")
            else:
                print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")
        else:
            print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")

    def Modify(self, args):
        print(args)
        print("")
        _authorizingAdmin = Admins.get(Admins.username == args.AuthorizingUser)
        if _authorizingAdmin is not None:
            _password = args.AuthorizingPassword
            _password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
            if _authorizingAdmin.password  == _password:
                _modifyAdmin = Admins.get(Admins.username == args.username)
                if _modifyAdmin is not None:
                    if len(_password) < 5:
                        if args.verbose:
                            passwordOK = False
                            while not passwordOK:
                                _password = input("Please, enter a valid password over 5 characters: ")
                                if len(_password) >= 5:
                                    passwordOK = True
                        else:
                            print("** Error: Password must be over 5 characters **")
                    _modifyAdminPassword = hashlib.sha224(str(args.password).encode('utf-8')).hexdigest()
                    _modifyAdmin = Admins(username = args.username,
                                    password = _modifyAdminPassword)
                    if _modifyAdmin.save():
                        print("Admin saved correctly")
                    else:
                        print("** Error: Admin could not be saved **")
                else:
                    print("** Error: Admin does not exists **")
            else:
                print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")
        else:
            print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")


    def Delete(self, args):
        print(args)


class ArgParser():
    def __init__(self, args):
        if len(args) < 2:
            print("This program needs at least one argument. Use \"%s -h\" for the usage."%(args[0]))
            sys.exit()
        self.__args__ = args
        self.definitionArgs()

    def definitionArgs(self):
        RouterIns = Router(self.__args__)

        parser = argparse.ArgumentParser(prog=self.__args__[0], description = "Add, modify or delete an admin")
        subparsers = parser.add_subparsers(metavar = "{option}", title= "Available commands", description="To see how to use each option use : \"" + self.__args__[0] + " {option} -h\" ")
        
        add_parser = subparsers.add_parser("add", description="Add an admin with a username and a password", help="Add a new admin with a given username and a password")
        add_parser.add_argument("username", metavar="Username", help="The new Username to be added for login")
        add_parser.add_argument("password", metavar="Password", help="The new Password to be added for login")
        add_parser.add_argument("-AU", "--AuthorizingUser", metavar="Authorizing_User", help="The Username which will be used to authorize the creation of the new user")
        add_parser.add_argument("-AP", "--AuthorizingPassword",  metavar="Authorizing_Password", help="The Password which will be used to authorize the creation of the new user")
        add_parser.add_argument("-v", "--verbose",  action="store_true", help="Show as much of the process as posible and if there are missing parameter allow to introduce them later")
        add_parser.set_defaults(func=RouterIns.Add)

        modify_parser = subparsers.add_parser("modify", description="Modify an admin's username or password", help="Modify a username, password or both of an existing admin given its name")
        modify_parser.add_argument("username", metavar="Username", help="The Username to be modified")
        options_modify_parser = modify_parser.add_argument_group()
        options_modify_parser.add_argument("-NU", "--NewUsername", metavar="New_User", help="The new Username for the user")
        options_modify_parser.add_argument("-NP", "--NewPassword",  metavar="New_Password", help="The new Password for the user")
        modify_parser.add_argument("-AU", "--AuthorizingUser", metavar="Authorizing_User", help="The Username which will be used to authorize the creation of the new user")
        modify_parser.add_argument("-AP", "--AuthorizingPassword",  metavar="Authorizing_Password", help="The Password which will be used to authorize the creation of the new user")
        modify_parser.add_argument("-v", "--verbose",  action="store_true", help="Show as much of the process as posible and if there are missing parameter allow to introduce them later")
        modify_parser.set_defaults(func=RouterIns.Modify)

        delete_parser = subparsers.add_parser("delete", description="Delete an admin", help="Allows to delete an admin")
        delete_parser.add_argument("username", metavar="Username", help="The Username to be deleted")
        delete_parser.add_argument("-AU", "--AuthorizingUser", metavar="Authorizing_User", help="The Username which will be used to authorize the creation of the new user")
        delete_parser.add_argument("-AP", "--AuthorizingPassword",  metavar="Authorizing_Password", help="The Password which will be used to authorize the creation of the new user")
        delete_parser.add_argument("-v", "--verbose",  action="store_true", help="Show as much of the process as posible and if there are missing parameter allow to introduce them later")
        delete_parser.set_defaults(func=RouterIns.Delete)

        del self.__args__[0]
        route = parser.parse_args(self.__args__)
        route.func(route)

if __name__ == "__main__":
    ArgParser(sys.argv)
