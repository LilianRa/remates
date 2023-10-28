# Remates
# Alcance
Este sistema se ocupa de la emisión de jugadas (a ganador) y la impresión de los tiquets
# Tecnología empleada
Backend 
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.2",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.1",
    "morgan": "^1.10.0",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.22"
Frontend
    "@react-pdf/renderer": "^3.1.13",
    "bootstrap-icons": "^1.11.1",
    "jspdf": "^2.5.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-pdf": "^7.4.0",
    "react-router-dom": "^6.14.2",
    "sweetalert2": "^11.7.32"
# Funcionalidades:
El sistema comprende:
    * Cuidador: en esta sección el usuario podrá dar de alta, modificar y eliminar los cuidadores
    * Caballos: en esta sección el usuario podrá dar de alta, modificar y eliminar los caballos
    * Jockey: en esta sección el usuario podrá dar de alta, modificar y eliminar los jockeys
    * Carreras: en esta sección el usuario dispondrá de información de las carreras , pudiendo dar de alta, modificar y eliminar las mismas.
    * Remates: en esta sección el usuario podrá cargar las jugadas y realizar la impresión del tiquet correspondiente
    *Usuario: en esta sección se controla los usuario logueados como así también el permiso según su rol de acceso a cada una de las secciones mensionadas anteriormente.
    En esta sección el usuario administrador de rol 1 podrá dar de alta, modificar o dar de baja a los usuarios del sistema. Como así también podrá blanquear las claves de acceso (la clave de blanqueo utilizada para ello es: siliconmisiones)
    *Login: en esta sección el usuario cuenta con las herramientas para el acceso al sistema
    *Registro: en esta sección el usuario podrá cargar sus datos en caso de no contar con una cuenta de acceso. Luego de la carga de sus datos podrá acceder al sistema.
