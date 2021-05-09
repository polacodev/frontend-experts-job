// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

let localization = new LocalizedStrings({
  en: {
    signInButtonFooterLabel: 'Sign Up',
    signInFooterLabel: "Don't have an account yet?",
    signInButton: 'Sign In',
    email: 'Email',
    password: 'Password',
    loginError: 'Email or Password incorrect',

    signUpButtonFooterLabel: 'Sign In',
    signUpFooterLabel: 'Already have an account?',
    signUpButton: 'Sign Up',
    name: 'User name',
    labelCellphone: 'Cellphone',
    workarea: 'Workarea',
    signUpError: 'All fields are required',
    userAlreadyExistMessage: 'Email already exist',

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

    networkTitle: 'Network Information!',
    networkMessage:
      'To use Experts Job, enable mobile data or connect to WI-FI network.',

    //validations
    validationName:
      'Please enter a alphanumeric value between 5 and 20 characters long',
    validationEmail: 'Please enter a valid email like example@gmail.com',
    validationPassword: 'Please enter a value between 5 and 20 characters long',
    validationCellphone: 'Please enter a numeric value of 8 digits long',
    validationArea:
      'Please enter a alphabetic value between 5 and 20 characters long',

    //errors && success
    userCreateError: 'ERROR: User has not been created',
    userSaveError: 'ERROR: Information not saved',
    userRequestError: 'ERROR: Was not able to get User Info',
    userSaveSuccess: 'Information saved',

    contactsDeleteError: 'ERROR: Contact has not been deleted',
    contactsRequestError: 'ERROR: Was not able to get Contacts',
    contactsDeleteSuccess: 'Contact has been deleted',

    searchAddContactError: 'ERROR: Contact has not been added',
    searchAddContactSuccess: 'Contact has been added',

    authError: 'ERROR: Authentication error!',

    statusAddError: 'ERROR: Status has not been added',
    statusRequestError: 'ERROR: Was not able to get Status',
    statusDeleteError: 'ERROR: Status has not been deleted',
    statusDeleteSuccess: 'Status has been deleted',
  },
  es: {
    //SignIn View
    signInButtonFooterLabel: 'Regístrate',
    signInFooterLabel: '¿Aún no tienes una cuenta?',
    signInButton: 'Ingresar',
    email: 'Correo',
    password: 'Contraseña',
    loginError: 'Correo o Contraseña Incorrecta',

    //SignUp View
    signUpButtonFooterLabel: 'Ingresar',
    signUpFooterLabel: '¿Ya tienes una cuenta?',
    signUpButton: 'Registrar',
    name: 'Nombre de usuario',
    labelCellphone: 'Celular',
    workarea: 'Area',
    signUpError: 'Todos los campos son requeridos',
    userAlreadyExistMessage: 'Correo ya esta registrado',

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
    availableText: 'DISPONIBLE',
    unavailableText: 'NO DISPONIBLE',
    userCellphone: 'Celular',
    userEmail: 'Correo',
    userWorkarea: 'Area',
    userDescription: 'Descripcion',
    userKnowledge: 'Conocimiento',
    userCancel: 'Cancelar',
    userSave: 'Guardar',

    //Routes
    routesExit: 'Salir',

    //Network Information
    networkTitle: 'Informacion de Red!',
    networkMessage:
      'Para usar Experts Job, habilite los datos moviles o conecte a una red WI-FI.',

    //validations
    validationName:
      'Por favor ingrese un valor alfa-numerico entre 5 a 20 caracteres',
    validationEmail:
      'Por favor ingrese un correo valido como example@gmail.com',
    validationPassword: 'Por favor ingrese un valor entre 5 a 20 caracteres',
    validationCellphone: 'Por favor ingrese un valor numerico de 8 digitos',
    validationArea: 'Por favor ingrese un valor entre 5 a 20 caracteres',

    //errors && success
    userCreateError: 'ERROR: Usuario no ha sido creado',
    userSaveError: 'ERROR: Informacion no ha sido guardada',
    userRequestError: 'ERROR: No se pudo recuperar datos',
    userSaveSuccess: 'Informacion ha sido guardada',

    contactsDeleteError: 'ERROR: Contacto no ha sido eliminado',
    contactsRequestError: 'ERROR: No se pudo recuperar lista Contactos',
    contactsDeleteSuccess: 'Contacto ha sido eliminado',

    searchAddContactError: 'ERROR: Contacto no ha sido agregado',
    searchAddContactSuccess: 'Contacto ha sido agregado',

    authError: 'ERROR: Error de Authenticacion!',

    statusAddError: 'ERROR: No se pudo crear el nuevo estado',
    statusRequestError: 'ERROR: No se pudo recuperar lista Estados',
    statusDeleteError: 'ERROR: No se pudo eliminar el estado',
    statusDeleteSuccess: 'Estado ha sido eliminado',
  },
});

export default localization;
