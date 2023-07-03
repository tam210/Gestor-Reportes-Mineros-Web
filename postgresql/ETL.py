import pandas as pd
import psycopg2
import os
import shutil
import subprocess

import random

def lectura(archivo, cursor):
    current_dir = os.path.dirname(os.path.realpath(__file__)) 
    filename = os.path.join(current_dir, archivo) 
    df = pd.read_csv(filename, delimiter=";", encoding='latin-1')
    df = df.dropna()
    insertarFlota(cursor,df)
    insertarCamion(cursor,df)
    insertarRajo(cursor,df)
    insertarDestino(cursor,df)
    insertarZona(cursor,df)
    insertarOrigen(cursor,df)
    insertarCarguio(cursor,df)
    insertarFecha(cursor,df)
    insertarViaje(cursor,df)

def buscarID(tabla,columna,cursor,idBuscar, dato):
    quer = str("SELECT "+idBuscar+" FROM "+tabla+" WHERE "+columna+" = '"+str(dato)+"'")
    cursor.execute(quer)
    a = cursor.fetchone()
    if a == None:
        query = "SELECT COUNT(*) FROM " + tabla
        cursor.execute(query)
        a = cursor.fetchone()
        # no esta en la base de datos y se le crea un nuevo id
        return [a[0],0]
    else:
        # Devuelve el id
        return [a[0],1]

def buscarIdViaje(cursor,idcarguio,idfecha,idcamion,idorigen,iddestino):
    query = str("select idviaje from viaje where idcarguio = '"+str(idcarguio)+"' and idfecha = '"+str(idfecha)+"' and idcamion = '"+str(idcamion)+"' and idorigen = '"+str(idorigen)+"' and iddestino = '"+str(iddestino)+"'")    
    cursor.execute(query)
    a = cursor.fetchone()
    if a == None:
        query = "SELECT COUNT(*) FROM viaje"
        cursor.execute(query)
        a = cursor.fetchone()
        # no esta en la base de datos y se le crea un nuevo id
        return [a[0],0]
    else:
        # Devuelve el id
        return [a[0],1]

def insertarFlota(cursor,dataFrame):
    #--------ETL tabla Flota--------
    flota = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Carguio","Cami¢n","Material","Origen","Zona","Destino","Tonelaje","Ciclos","Rajo","Fecha"]
    flota = flota.drop(columnas, axis=1)
    # Eliminar filas repetidas y duplicadas
    flota['Flota'] = flota['Flota'].drop_duplicates()
    flota = flota.dropna()
    # asignacion del ID
    suma = 0
    ids = []
    for x in flota["Flota"]:
        y = buscarID("flota","nombre",cursor,"idFlota",x)
        if y[1] == 0:
            ids.append(y[0]+suma)
            suma += 1
        else:
            flota = flota[flota['Flota'] != x]
    flota['idFlota'] = ids
    orden = ['idFlota','Flota']
    flota = flota[orden]
    flota = flota.rename(columns={'Flota':'nombre'})

    # Inserte en la BD
    tabla = 'flota'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s)".format(tabla, ", ".join(flota.columns))

    cursor.executemany(insert_query, flota.values.tolist())

def insertarCamion(cursor,dataFrame):
    #--------ETL tabla Camion--------
    camion = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Carguio","Material","Origen","Zona","Destino","Tonelaje","Ciclos","Rajo","Fecha"]
    camion = camion.drop(columnas, axis=1)
    # Eliminar filas repetidas y duplicadas
    camion = camion.rename(columns={'Cami¢n':'patente'})
    camion['patente'] = camion['patente'].drop_duplicates()
    camion = camion.dropna()
    #asignacion del ID
    suma = 0
    idsCamion = []
    for x in camion["patente"]:
        y = buscarID("camion","patente",cursor,"idcamion",x)
        if y[1] == 0:
            idsCamion.append(y[0]+suma)
            suma += 1
        else:
            camion = camion[camion['patente'] != x]
    idsFlota = []
    for x in camion["Flota"]:
        y = buscarID("flota","nombre",cursor,"idflota",x)
        if y[1] == 1:
            idsFlota.append(y[0])
        else:
            print("si")
    
    camion['idcamion'] = idsCamion
    camion['idflota'] = idsFlota
    camion = camion.drop('Flota',axis=1)

    orden = ['idcamion','idflota','patente']
    camion = camion[orden]

    # Inserte en la BD
    tabla = 'camion'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s, %s)".format(tabla, ", ".join(camion.columns))

    cursor.executemany(insert_query, camion.values.tolist())
    
def insertarRajo(cursor,dataFrame):
    #--------ETL tabla Rajo--------
    Rajo = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Carguio","Cami¢n","Material","Origen","Zona","Destino","Tonelaje","Ciclos","Flota","Fecha"]
    Rajo = Rajo.drop(columnas, axis=1)
    # Eliminar filas repetidas y duplicadas
    Rajo['Rajo'] = Rajo['Rajo'].drop_duplicates()
    Rajo = Rajo.dropna()
    # asignacion del ID
    suma = 0
    idsRajo = []
    for x in Rajo["Rajo"]:
        y = buscarID("rajo","nombre",cursor,"idRajo",x)
        if y[1] == 0:
            idsRajo.append(y[0] + suma)
            suma += 1
        else:
            Rajo = Rajo[Rajo['Rajo'] != x]
    Rajo['idRajo'] = idsRajo
    orden = ['idRajo','Rajo']
    Rajo = Rajo[orden]
    Rajo = Rajo.rename(columns={'Rajo':'nombre'})

    # Inserte en la BD
    tabla = 'rajo'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s)".format(tabla, ", ".join(Rajo.columns))  
    cursor.executemany(insert_query, Rajo.values.tolist())

def insertarDestino(cursor,dataFrame):
    #--------ETL tabla Destino--------
    Destino = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Carguio","Cami¢n","Material","Origen","Zona","Flota","Tonelaje","Ciclos","Fecha"]
    Destino = Destino.drop(columnas, axis=1)
    # Eliminar filas repetidas y duplicadas
    Destino = Destino.rename(columns={'Destino':'nombre'})
    Destino['nombre'] = Destino['nombre'].drop_duplicates()
    Destino = Destino.dropna()
    #asignacion del ID
    suma = 0
    idsDestino = []
    for x in Destino["nombre"]:
        y = buscarID("destino","nombre",cursor,"iddestino",x)
        if y[1] == 0:
            idsDestino.append(y[0]+suma)
            suma += 1
        else:
            Destino = Destino[Destino['nombre'] != x]
    idsRajo = []
    for x in Destino["Rajo"]:
        y = buscarID("Rajo","nombre",cursor,"idrajo",x)
        if y[1] == 1:
            idsRajo.append(y[0])
        else:
            print("si")
    
    Destino['iddestino'] = idsDestino
    Destino['idrajo'] = idsRajo
    Destino = Destino.drop('Rajo',axis=1)

    orden = ['iddestino','idrajo','nombre']
    Destino = Destino[orden]

    # Inserte en la BD
    tabla = 'destino'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s, %s)".format(tabla, ", ".join(Destino.columns))

    cursor.executemany(insert_query, Destino.values.tolist())

def insertarZona(cursor,dataFrame):
    #--------ETL tabla Zona--------
    zona = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Carguio","Cami¢n","Material","Origen","Flota","Destino","Tonelaje","Ciclos","Fecha"]
    zona = zona.drop(columnas, axis=1)
    # Eliminar filas repetidas y duplicadas
    zona = zona.rename(columns={'Zona':'nombre'})
    zona['nombre'] = zona['nombre'].drop_duplicates()
    zona = zona.dropna()
    #asignacion del ID
    suma = 0
    idszona = []
    for x in zona["nombre"]:
        y = buscarID("zona","nombre",cursor,"idzona",x)
        if y[1] == 0:
            idszona.append(y[0]+suma)
            suma += 1
        else:
            zona = zona[zona['nombre'] != x]
    idsRajo= []
    for x in zona["Rajo"]:
        y = buscarID("Rajo","nombre",cursor,"idrajo",x)
        if y[1] == 1:
            idsRajo.append(y[0])
        else:
            print("si")
    
    zona['idzona'] = idszona
    zona['idrajo'] = idsRajo
    zona = zona.drop('Rajo',axis=1)

    orden = ['idzona','idrajo','nombre']
    zona = zona[orden]

    # Inserte en la BD
    tabla = 'zona'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s, %s)".format(tabla, ", ".join(zona.columns))

    cursor.executemany(insert_query, zona.values.tolist())

def insertarOrigen(cursor,dataFrame):
    #--------ETL tabla Origen--------
    Origen = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Carguio","Cami¢n","Material","Flota","Destino","Tonelaje","Ciclos","Rajo","Fecha"]
    Origen = Origen.drop(columnas, axis=1)
    # Eliminar filas repetidas y duplicadas
    Origen = Origen.rename(columns={'Origen':'nombre'})
    Origen['nombre'] = Origen['nombre'].drop_duplicates()
    Origen = Origen.dropna()
    #asignacion del ID
    suma = 0
    idsOrigen = []
    for x in Origen["nombre"]:
        y = buscarID("Origen","nombre",cursor,"idOrigen",x)
        if y[1] == 0:
            idsOrigen.append(y[0]+suma)
            suma += 1
        else:
            Origen = Origen[Origen['nombre'] != x]
    idsZona= []
    for x in Origen["Zona"]:
        y = buscarID("Zona","nombre",cursor,"idZona",x)
        if y[1] == 1:
            idsZona.append(y[0])
        else:
            print("si")
    
    Origen['idOrigen'] = idsOrigen
    Origen['idZona'] = idsZona
    Origen = Origen.drop('Zona',axis=1)

    orden = ['idOrigen','idZona','nombre']
    Origen = Origen[orden]

    # Inserte en la BD
    tabla = 'Origen'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s, %s)".format(tabla, ", ".join(Origen.columns))

    cursor.executemany(insert_query, Origen.values.tolist())

def insertarCarguio(cursor,dataFrame):
    #--------ETL tabla Carguio--------
    Carguio = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Flota","Cami¢n","Material","Origen","Zona","Destino","Tonelaje","Ciclos","Rajo","Fecha"]
    Carguio = Carguio.drop(columnas, axis=1)
    # Eliminar filas repetidas y duplicadas
    Carguio['Carguio'] = Carguio['Carguio'].drop_duplicates()
    Carguio = Carguio.dropna()
    # asignacion del ID
    suma = 0
    ids = []
    for x in Carguio["Carguio"]:
        y = buscarID("Carguio","nombre",cursor,"idCarguio",x)
        if y[1] == 0:
            ids.append(y[0]+suma)
            suma += 1
        else:
            Carguio = Carguio[Carguio['Carguio'] != x]
    Carguio['idCarguio'] = ids
    orden = ['idCarguio','Carguio']
    Carguio = Carguio[orden]
    Carguio = Carguio.rename(columns={'Carguio':'nombre'})

    # Inserte en la BD
    tabla = 'Carguio'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s)".format(tabla, ", ".join(Carguio.columns))

    cursor.executemany(insert_query, Carguio.values.tolist())

def insertarFecha(cursor,dataFrame):
    #--------ETL tabla Fecha--------
    Fecha = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Carguio","Cami¢n","Material","Origen","Zona","Destino","Tonelaje","Ciclos","Rajo","Flota"]
    Fecha = Fecha.drop(columnas, axis=1)
    # Eliminar filas repetidas y duplicadas
    Fecha['Fecha'] = Fecha['Fecha'].drop_duplicates()
    Fecha = Fecha.dropna()
    # asignacion del ID
    suma = 0
    ids = []
    for x in Fecha["Fecha"]:
        y = buscarID("Fecha","fecha",cursor,"idFecha",x)
        if y[1] == 0:
            ids.append(y[0]+suma)
            suma += 1
        else:
            Fecha = Fecha[Fecha['Fecha'] != x]
    Fecha['idFecha'] = ids
    orden = ['idFecha','Fecha']
    Fecha = Fecha[orden]
    Fecha = Fecha.rename(columns={'Fecha':'fecha'})

    # Inserte en la BD
    tabla = 'Fecha'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s)".format(tabla, ", ".join(Fecha.columns))

    cursor.executemany(insert_query, Fecha.values.tolist())

def insertarViaje(cursor,dataFrame):
   #--------ETL tabla Viaje--------
    Viaje = dataFrame
    # Eliminar Columnas inncesarias
    columnas = ["Zona","Flota","Rajo"]
    Viaje = Viaje.drop(columnas, axis=1)
    # Cambiar nombre a la columna camion
    Viaje = Viaje.rename(columns={'Cami¢n':'camion'})
    #asignacion del ID
    idsCargio = []
    idsFecha = []
    idsCamion = []
    idsOrigen = []
    idsDestino = [] 
    idsViaje = []
    suma = 0
    for index, row in Viaje.iterrows():
        z = 0
        idCarguio = buscarID("Carguio","nombre",cursor,"idCarguio",row["Carguio"])
        
        idFecha = buscarID("Fecha","fecha",cursor,"idFecha",row["Fecha"])
        
        idCamion = buscarID("camion","patente",cursor,"idCamion",row["camion"])
        
        idOrigen = buscarID("origen","nombre",cursor,"idOrigen",row["Origen"])

        idDestino = buscarID("destino","nombre",cursor,"idDestino",row["Destino"])
        
        y = buscarIdViaje(cursor,idCarguio[0],idFecha[0],idCamion[0],idOrigen[0],idDestino[0])
        if y[1] == 0:
            idsCargio.append(idCarguio[0])
            idsFecha.append(idFecha[0])
            idsCamion.append(idCamion[0])
            idsOrigen.append(idOrigen[0])
            idsDestino.append(idDestino[0])
            idsViaje.append(y[0]+suma)
            suma += 1
        else:
            print("si")
            Viaje = Viaje.drop(index)
        
    Viaje['idCarguio'] = idsCargio
    Viaje['idFecha'] = idsFecha
    Viaje['idCamion'] = idsCamion
    Viaje['idOrigen'] = idsOrigen
    Viaje['idDestino'] = idsDestino
    Viaje['idViaje'] = idsViaje

    Viaje = Viaje.drop('Carguio',axis=1)
    Viaje = Viaje.drop('Fecha',axis=1)
    Viaje = Viaje.drop('camion',axis=1)
    Viaje = Viaje.drop('Origen',axis=1)
    Viaje = Viaje.drop('Destino',axis=1)
    
    Viaje = Viaje.rename(columns={'Tonelaje':'TonelajeReal'})

    Viaje["Tonelaje"] = 0
    Viaje['TonelajeReal'] = Viaje['TonelajeReal'].replace(',','.', regex = True)

    Viaje['TonelajeReal'] = pd.to_numeric(Viaje['TonelajeReal'], errors='coerce')
    Viaje['TonelajeReal'] = Viaje['TonelajeReal'].round().astype(int)

    orden = ['idViaje','idCarguio','idFecha','idCamion','idOrigen','idDestino','Ciclos','Tonelaje','TonelajeReal','Material']
    Viaje = Viaje[orden]

    # Inserte en la BD
    tabla = 'viaje'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)".format(tabla, ", ".join(Viaje.columns))

    cursor.executemany(insert_query, Viaje.values.tolist())

def buscarArchivo():
    #carpeta del proyecto
    carpeta = os.getcwd()

    #carpeta en la que se encuentra los archivos guardados
    carpeta = carpeta + str("\postgresql")

    # se crea una lista de todos los archivos dentro de la carpeta
    archivos = os.listdir(carpeta)

    for archivo in archivos:
        if archivo.endswith(".csv"):
            return archivo
    vacio = "null"
    return vacio

def moverArchivo(archivo):
    #carpeta del proyecto
    carpeta = os.getcwd()

    #carpeta en la que se encuentra los archivos guardados
    carpeta = carpeta + str("\postgresql")

    rutaActual = os.path.join(carpeta,archivo)

    destino = carpeta + str("\Procesados")

    shutil.move(rutaActual,destino)

def ejecutar_script_con_parametro(script_path, parametro):
    subprocess.run(["python", script_path, parametro])

def aleatorio(cursor):
    
    quer = str("SELECT fecha.IDfecha, zona.idzona, SUM (viaje.tonelajereal) as real FROM viaje JOIN origen ON viaje.idorigen = origen.idorigen JOIN zona ON origen.idzona = zona.idzona JOIN rajo ON rajo.idrajo = zona.idrajo JOIN fecha ON fecha.idfecha = viaje.idfecha GROUP BY fecha.idfecha, zona.idzona,rajo.idrajo ORDER BY fecha.idfecha,zona.idzona")
    cursor.execute(quer)
    a = cursor.fetchall()
    kpi = pd.DataFrame(a,columns=['idfecha','idzona','real'])
    ids = []
    esperado = []
    idn = 0
    for valor in kpi['real']:
        numero = random.randint(-10,10)
        porcentaje = 100 + numero
        nuevo = valor*porcentaje/100
        esperado.append(nuevo)
        ids.append(idn)
        idn += 1
    kpi['idkpi'] = ids
    kpi['esperado'] = esperado
    kpi = kpi.drop('real',axis=1)
    orden = ['idkpi','idfecha','idzona','esperado']
    kpi = kpi[orden]
    tabla = 'kpi'
    insert_query = "INSERT INTO {} ({}) VALUES (%s, %s, %s, %s)".format(tabla, ", ".join(kpi.columns))

    cursor.executemany(insert_query, kpi.values.tolist())



contra = "postgres"
conexion = psycopg2.connect(host="localhost", database="mineriaDB", user="postgres", password=contra)
cur = conexion.cursor()

archivo = buscarArchivo()

if archivo != "null":
    lectura(archivo,cur)
    moverArchivo(archivo)

    python = "postgresql\\ActualizacionReporte.py"
    parametro = archivo

    ejecutar_script_con_parametro(python, parametro)
aleatorio(cur)
conexion.commit()
conexion.close()

