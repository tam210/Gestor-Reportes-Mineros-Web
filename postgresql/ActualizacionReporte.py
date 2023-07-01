import sys
import os
def funcion_principal():
    # Obtener el argumento pasado desde el otro script
    argumento = sys.argv[1]
    
    # Utilizar el argumento como desees
    # Ejemplo de uso
    carpeta = os.getcwd()
    carpeta = carpeta + str("/postgresql")
    txt = "/test.txt"
    ruta_archivo_txt = carpeta + txt  # Reemplaza con la ruta y nombre que deseas para el archivo .txt
    contenido_txt = "se ingreso el documento llamado" + str(argumento)
    crear_archivo_txt(ruta_archivo_txt, contenido_txt)


def crear_archivo_txt(ruta_archivo, contenido):
    with open(ruta_archivo, "w") as archivo:
        archivo.write(contenido)
    print("Archivo creado:", ruta_archivo)


funcion_principal()
