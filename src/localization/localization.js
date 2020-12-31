// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

let localization = new LocalizedStrings({
  en: {
    buttonFooterLabel: 'Sign Up',
    footerLabel: "Don't have an account yet?",
    customButton: 'Sign In',
    email: 'Email',
    password: 'Password',
    loginError: 'Email or Password incorrect',

    signUp: 'Sign Up',
    isHaveAccount: 'Already have an account?',
    buttonSignUpLabel: 'Sign In',
    name: 'User name',
    labelCellphone: 'Cellphone',
    workarea: 'Workarea',
    signUpError: 'All fields are required',

    dismiss: 'Dismiss',
    KnowledgeContact: 'Knowledge',
    ContactsTabTop: 'Contacts',
    ContactsTabFoot: 'Contacts',
    noData: 'No Data',

    removeStatus: 'OK',
    cellphone: 'Cellphone',
    area: 'Workarea',
    KnowledgeStatus: 'Knowledge',
    StatusTabTop: 'Status',
    StatusTabFoot: 'Status',

    SearchTabTop: 'Search',
    SearchTabFoot: 'Search',

    UserTabTop: 'User Information',
    UserTabFoot: 'User',
    availableText: 'AVAILABLE',
    unavailableText: 'UNAVAILABLE',
    userCellphone: 'Cellphone',
    userEmail: 'Email',
    userWorkarea: 'Workarea',
    userDescription: 'Description',
    userKnowledge: 'Knowledge',
    userCancel: 'Cancel',
    userSave: 'Save',

    //Routes
    routesExit: 'Exit',
  },
  es: {
    //SignIn View
    buttonFooterLabel: 'Regístrate',
    footerLabel: '¿Aún no tienes una cuenta?',
    customButton: 'Ingresar',
    email: 'Correo',
    password: 'Contraseña',
    loginError: 'Correo o Contraseña Incorrecta',

    //SignUp View
    signUp: 'Registrar',
    isHaveAccount: '¿Ya tienes una cuenta?',
    buttonSignUpLabel: 'Ingresar',
    name: 'Nombre de usuario',
    labelCellphone: 'Celular',
    workarea: 'Area',
    signUpError: 'Todos los campos son requeridos',

    //Contacts View
    dismiss: 'Cerrar',
    KnowledgeContact: 'Conocimiento',
    ContactsTabTop: 'Contactos',
    ContactsTabFoot: 'Contactos',
    noData: 'No hay Datos',

    //Status View
    removeStatus: 'Borrar',
    cellphone: 'Celular',
    area: 'Area',
    KnowledgeStatus: 'Conocimiento',
    StatusTabTop: 'Estados',
    StatusTabFoot: 'Estados',

    //Search View
    SearchTabTop: 'Buscar',
    SearchTabFoot: 'Buscar',

    //User View
    UserTabTop: 'Informacion de Usuario',
    UserTabFoot: 'Usuario',
    availableText: 'Disponible',
    unavailableText: 'No Disponible',
    userCellphone: 'Celular',
    userEmail: 'Correo',
    userWorkarea: 'Area',
    userDescription: 'Descripcion',
    userKnowledge: 'Conocimiento',
    userCancel: 'Cancelar',
    userSave: 'Guardar',

    //Routes
    routesExit: 'Salir',
  },
});

export default localization;
