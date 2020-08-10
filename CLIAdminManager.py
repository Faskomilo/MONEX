# -*- coding: utf-8 -*-
import argparse, sys, hashlib, re
from models.Admins import Admins
from models.AdminLog import AdminLog


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
                        print("** Error: Carácter en la contraseña no válido: " + char + " **")
                        sys.exit()
                for char in  args.username:
                    if char not in charList:
                        print("** Error: Carácter en el  nombre de usuario no válido: " + char + " **")
                        sys.exit()
                _newAdmin = Admins.get(Admins.username == args.username)
                if _newAdmin is None:
                    _password = args.password
                    if len(_password) < 5:
                        print("** Error: Las contraseñas deben contener 5 caracteres al menos **")
                        sys.exit()
                    _username = args.username
                    if len(_username) < 5:
                        print("** Error: Los nombres de usuario deben contener 5 caracteres al menos**")
                        sys.exit()
                    _newAdminPassword = hashlib.sha224(str(args.password).encode('utf-8')).hexdigest()
                    _newAdmin = Admins(username = args.username,
                                    password = _newAdminPassword)
                    if _newAdmin.save():
                        print("Admin agregado corréctamente")
                    else:
                        print("** Error: El Admin no pudo ser agregado, inténtelo más tarde **")
                else:
                    print("** Error: Ya existe un Admin con ese nombre de usuario **")
            else:
                print("** Error: Nombre de usuario del administrador autorizando no existe. Por favor inténtelo de nuevo **")
        else:
            print("** Error: Nombre de usuario del administrador autorizando no existe. Por favor inténtelo de nuevo **")

    def Modify(self, args):
        print("")
        if args.NewPassword is None and args.NewUsername is None:
            print("** Error: Ningún cambio seleccionado, se requiere ya sea de \"-NP\"(\"--NewPassword\") o \"-NU\"(--NewUsername)\" o ambos para modificar un administrador **")
            sys.exit()
        _authorizingAdmin = Admins.get(Admins.username == args.AuthorizingUser)
        if _authorizingAdmin is not None and _authorizingAdmin.deleted != 1:
            _password = args.AuthorizingPassword
            _password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
            if _authorizingAdmin.password  == _password:
                _modifyAdmin = Admins.get(Admins.username == args.username)
                if _modifyAdmin is not None and _modifyAdmin.deleted == 0:
                    _password = _modifyAdmin.password
                    _username = _modifyAdmin.username
                    charList = self.notAllowedSpecialChars()
                    if args.NewPassword is not None:
                        _password = args.NewPassword
                        if len(_password) < 5:
                            print("** Error: Las contraseñas deben contener 5 caracteres al menos **")
                            sys.exit()
                        for char in  args.NewPassword:
                            if char not in charList:
                                print("** Error: Caracter en la contraseña no válido: " + char + " **")
                                sys.exit()
                        _password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
                    if args.NewUsername is not None:
                        _username = args.NewUsername
                        if len(_username) < 5:
                            print("** Error: Los nombres de usuario deben contener 5 caracteres al menos**")
                            sys.exit()
                        for char in  args.NewUsername:
                            if char not in charList:
                                print("** Error: Caracter en el usuario no válido: " + char + " **")
                                sys.exit()
                    _modifyAdmin.username = _username
                    _modifyAdmin.password = _password
                    if _modifyAdmin.save():
                        print("Admin modificado corréctamente")
                    else:
                        print("** Error: El Admin no pudo ser modificado, inténtelo más tarde **")
                else:
                    print("** Error: El nombre de usuario del Admin a modificar no existe **")
            else:
                print("** Error: Nombre de usuario del administrador autorizando no existe. Por favor inténtelo de nuevo **")
        else:
            print("** Error: Nombre de usuario del administrador autorizando no existe. Por favor inténtelo de nuevo **")


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
                        print("** Error: Si se eliminase este administrador, el sistema quedaría sin administradores válidos, por favor cree uno nuevo antes de eliminar este administrador **")
                        sys.exit()
                    logsFromAdmin = len(AdminLog.getAll(AdminLog.idAdmin == _deleteAdmin.id))
                    if logsFromAdmin > 0:
                        _deleteAdmin.deleted = 1
                        if _deleteAdmin.save():
                            print("Admin modificado corréctamente")
                        else:
                            print("** Error: El Admin no pudo ser eliminado, inténtelo más tarde **")
                    else:
                        _deleteAdmin.delete()
                else:
                    print("** Error: El nombre de usuario del Admin a modificar no existe **")
            else:
                print("** Error: Nombre de usuario del administrador autorizando no existe. Por favor inténtelo de nuevo **")
        else:
            print("** Error: Nombre de usuario del administrador autorizando no existe. Por favor inténtelo de nuevo **")


class ArgParser():
    def __init__(self, args):
        self.__args__ = args
        self.definitionArgs()

    def definitionArgs(self):
        ActionHandlerIns = ActionHandler()

        parser = argparse.ArgumentParser(prog=self.__args__[0], description = "Añadir, modificar o eliminar un administrador")
        parser.add_argument("AuthorizingUser", metavar="Authorizing_Admin_Username", help="El nombre de usuario del administrador que autorizará la operación")
        parser.add_argument("AuthorizingPassword", metavar="Authorizing_Admin_Password", help="La contraseña del administrador que autorizará la operación")

        subparsers = parser.add_subparsers(metavar = "{option}", title= "Comandos Disponibles", required = True,description="Para ver el uso de cada opción use: \"" + self.__args__[0] + " {option} -h\" ")
        
        add_parser = subparsers.add_parser("add", description="Agregue un nuevo administrador con un nuevo nombre de usuario y una contraseña", help="Agregue un nuevo administrador con un nombre de usuario y una contraseña")
        add_parser.add_argument("username", metavar="Admin_Username_To_Add", help="El nombre de usuario del nuevo administrador")
        add_parser.add_argument("password", metavar="Admin_Password_To_Add", help="La contraseña del nuevo administrador")
        add_parser.set_defaults(func=ActionHandlerIns.Add)

        modify_parser = subparsers.add_parser("modify", description="Modifique el nombre de usuario o contraseña de un admin", help="Modifique el nombre de usuario, contraseña o ambos atributos de un administrador ya existente dando su nombre de usuario")
        modify_parser.add_argument("username", metavar="Existant_Admin_Username", help="El nombre de usuario actual del administrador a modificar")
        options_modify_parser = modify_parser.add_argument_group()
        options_modify_parser.add_argument("-NU", "--NewUsername", metavar="New_User", help="El nuevo nombre de usuario del administrador")
        options_modify_parser.add_argument("-NP", "--NewPassword",  metavar="New_Password", help="La nueva contraseña del administrador")
        modify_parser.set_defaults(func=ActionHandlerIns.Modify)

        delete_parser = subparsers.add_parser("delete", description="Eliminar un administrador dando su nombre", help="Permite eliminar un administrador")
        delete_parser.add_argument("username", metavar="Existant_Admin_Username", help="El nombre de usuario del admin a eliminar")
        delete_parser.set_defaults(func=ActionHandlerIns.Delete)

        del self.__args__[0]
        route = parser.parse_args(self.__args__)
        route.func(route)

if __name__ == "__main__":
    ArgParser(sys.argv)
