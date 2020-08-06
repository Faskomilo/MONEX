import argparse, sys, hashlib, re
from models.Admins import Admins

class ActionHandler():

    @staticmethod
    def notAllowedSpecialChars():
        numbersList = [number for number in "0123456789"]
        charsList = [letter for letter in "abcdefghijklmnopqrstuvwxyz"]
        capitalCharsList = [letter for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
        allowedSpecialChars = [char for char in "$–_.+!*'(),"]
        fullList = numbersList + charsList + capitalCharsList + allowedSpecialChars
        return fullList


    def Add(self, args):
        print("")
        _authorizingAdmin = Admins.get(Admins.username == args.AuthorizingUser)
        if _authorizingAdmin is not None and _authorizingAdmin.deleted != 1:
            _password = args.AuthorizingPassword
            _password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
            if _authorizingAdmin.password  == _password:
                charList = self.notAllowedSpecialChars()
                for char in  args.password:
                    if char not in charList:
                        print("** Error: Caracter en la contraseña no válido: " + char + " **")
                        sys.exit()
                for char in  args.username:
                    if char not in charList:
                        print("** Error: Caracter en el usuario no válido: " + char + " **")
                        sys.exit()
                _newAdmin = Admins.get(Admins.username == args.username)
                if _newAdmin is None:
                    _password = args.password
                    if len(_password) < 5:
                        print("** Error: Password must be over 5 characters **")
                        sys.exit()
                    _username = args.NewUsername
                    if len(_username) < 5:
                        print("** Error: New Username must be over 5 characters **")
                        sys.exit()
                    _newAdminPassword = hashlib.sha224(str(args.password).encode('utf-8')).hexdigest()
                    _newAdmin = Admins(username = args.username,
                                    password = _newAdminPassword)
                    if _newAdmin.save():
                        print("Admin added correctly")
                    else:
                        print("** Error: Admin could not be added **")
                else:
                    print("** Error: Admin already exists **")
            else:
                print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")
        else:
            print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")

    def Modify(self, args):
        print("")
        if args.NewPassword is None and args.NewUsername is None:
            print("** Error: No change selected, missing either -NP(--NewPassword) or -NU(--NewUsername) to modify the Admin **")
            sys.exit()
        _authorizingAdmin = Admins.get(Admins.username == args.AuthorizingUser)
        if _authorizingAdmin is not None and _authorizingAdmin.deleted != 1:
            _password = args.AuthorizingPassword
            _password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
            if _authorizingAdmin.password  == _password:
                _modifyAdmin = Admins.get(Admins.username == args.username)
                if _modifyAdmin is not None:
                    _password = _modifyAdmin.password
                    _username = _modifyAdmin.username
                    charList = self.notAllowedSpecialChars()
                    if args.NewPassword is not None:
                        _password = args.NewPassword
                        if len(_password) < 5:
                            print("** Error: New Password must be over 5 characters **")
                            sys.exit()
                        for char in  args.NewPassword:
                            if char not in charList:
                                print("** Error: Caracter en la contraseña no válido: " + char + " **")
                                sys.exit()
                        _password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
                    if args.NewUsername is not None:
                        _username = args.NewUsername
                        if len(_username) < 5:
                            print("** Error: New Username must be over 5 characters **")
                            sys.exit()
                        for char in  args.NewUsername:
                            if char not in charList:
                                print("** Error: Caracter en el usuario no válido: " + char + " **")
                                sys.exit()
                    _modifyAdmin.username = _username
                    _modifyAdmin.password = _password
                    if _modifyAdmin.save():
                        print("Admin modified correctly")
                    else:
                        print("** Error: Admin could not be modified **")
                else:
                    print("** Error: Admin does not exists **")
            else:
                print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")
        else:
            print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")


    def Delete(self, args):
        print("")
        _authorizingAdmin = Admins.get(Admins.username == args.AuthorizingUser)
        if _authorizingAdmin is not None and _authorizingAdmin.deleted != 1:
            _password = args.AuthorizingPassword
            _password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
            if _authorizingAdmin.password  == _password:
                _deleteAdmin = Admins.get(Admins.username == args.username)
                if _deleteAdmin is not None and _deleteAdmin.deleted != 1:
                    _allAdmins = len(Admins.getAll(Admins.deleted == 0))
                    if _allAdmins == 1:
                        print("** Error: By deleting this admin, the system would be left without a valid Admin, please create another one before deleting it **")
                        sys.exit()
                    _deleteAdmin.deleted = 1
                    if _deleteAdmin.save():
                        print("Admin deleted correctly")
                    else:
                        print("** Error: Admin could not be deleted **")
                else:
                    print("** Error: Admin does not exists **")
            else:
                print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")
        else:
            print("** Error: Authorizing Admin's username or password does not match any existing one. Please try again **")


class ArgParser():
    def __init__(self, args):
        self.__args__ = args
        self.definitionArgs()

    def definitionArgs(self):
        ActionHandlerIns = ActionHandler()

        parser = argparse.ArgumentParser(prog=self.__args__[0], description = "Añadir, modificar o eliminar un administrador")
        parser.add_argument("AuthorizingUser", metavar="Authorizing_Admin_Username", help="El nombre de usuario del administrador que autorizará la operación")
        parser.add_argument("AuthorizingPassword", metavar="Authorizing_Admin_Password", help="El nombre de usuario del administrador que autorizará la operación")

        subparsers = parser.add_subparsers(metavar = "{option}", title= "Available commands", required = True,description="To see how to use each option use : \"" + self.__args__[0] + " {option} -h\" ")
        
        add_parser = subparsers.add_parser("add", description="Add an admin with a username and a password", help="Add a new admin with a given username and a password")
        add_parser.add_argument("username", metavar="Admin_Username_To_Add", help="The new Username to be added for login")
        add_parser.add_argument("password", metavar="Admin_Password_To_Add", help="The new Password to be added for login")
        add_parser.set_defaults(func=ActionHandlerIns.Add)

        modify_parser = subparsers.add_parser("modify", description="Modify an admin's username or password", help="Modify a username, password or both of an existing admin given its name")
        modify_parser.add_argument("username", metavar="Existant_Admin_Username", help="The Username to be modified")
        options_modify_parser = modify_parser.add_argument_group()
        options_modify_parser.add_argument("-NU", "--NewUsername", metavar="New_User", help="The new Username for the user")
        options_modify_parser.add_argument("-NP", "--NewPassword",  metavar="New_Password", help="The new Password for the user")
        modify_parser.set_defaults(func=ActionHandlerIns.Modify)

        delete_parser = subparsers.add_parser("delete", description="Delete an admin", help="Allows to delete an admin")
        delete_parser.add_argument("username", metavar="Existant_Admin_Username", help="The Username to be deleted")
        delete_parser.set_defaults(func=ActionHandlerIns.Delete)

        del self.__args__[0]
        route = parser.parse_args(self.__args__)
        route.func(route)

if __name__ == "__main__":
    ArgParser(sys.argv)
