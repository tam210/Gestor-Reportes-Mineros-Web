#import sqlalchemy
import pandas as pd
import psycopg2
import os


def creacionTablasDatos(cursor):
    tabla_flota = "DROP TABLE IF EXISTS flota; CREATE TABLE flota(idFlota INT NOT NULL, nombre text, PRIMARY KEY (idFlota))"
    tabla_camion = "DROP TABLE IF EXISTS camion; CREATE TABLE camion(idCamion INT NOT NULL, idFlota INT NOT NULL, patente text, PRIMARY KEY (idCamion), FOREIGN KEY (idFlota) REFERENCES flota(idFlota))"
    tabla_rajo = "DROP TABLE IF EXISTS rajo; CREATE TABLE rajo(idRajo INT NOT NULL, nombre text, PRIMARY KEY(idRajo))"
    tabla_destino = "DROP TABLE IF EXISTS destino; CREATE TABLE destino(idDestino INT NOT NULL, idRajo INT NOT NULL, nombre text, PRIMARY KEY (idDestino), FOREIGN KEY(idRajo) REFERENCES rajo(idRajo))"
    tabla_zona = "DROP TABLE IF EXISTS zona; CREATE TABLE zona(idZona INT NOT NULL, idRajo INT NOT NULL, nombre text, PRIMARY KEY (idZona), FOREIGN KEY(idRajo) REFERENCES rajo(idRajo))"
    tabla_origen = "DROP TABLE IF EXISTS origen; CREATE TABLE origen(idOrigen INT NOT NULL, idZona INT NOT NULL, nombre text, PRIMARY KEY(idOrigen), FOREIGN KEY(idZona) REFERENCES zona(idZona))"
    tabla_viaje = "DROP TABLE IF EXISTS viaje; CREATE TABLE viaje(idViaje INT NOT NULL, idCamion INT NOT NULL, idOrigen INT NOT NULL, idDestino INT NOT NULL, fecha date, ciclo int, tonelaje float,tonelajeReal float, material text, PRIMARY KEY(idViaje), FOREIGN KEY(idCamion) REFERENCES camion(idCamion), FOREIGN KEY (idOrigen) REFERENCES origen(idOrigen), FOREIGN KEY(idDestino) REFERENCES destino(idDestino))"
    # tabla de carguio por decidir
    #--------------falta tabla KPI---------------

    cursor.execute(tabla_flota)
    cursor.execute(tabla_camion)
    cursor.execute(tabla_rajo)
    cursor.execute(tabla_destino)
    cursor.execute(tabla_zona)
    cursor.execute(tabla_origen)
    cursor.execute(tabla_viaje)

def creacionTablasUsuarios(cursor):
    tabla_usuario = "DROP TABLE IF EXISTS usuario; CREATE TABLE usuario(idUsuario INT NOT NULL, nombre text, apellido text, correo text, pass text, tipoUsuario INT, PRIMARY KEY (idUsuario))"
    tabla_solicitudes = "DROP TABLE IF EXISTS solicitud; CREATE TABLE solicitud(idSolicitud INT NOT NULL, idUsuario INT NOT NULL, estado boolean, fecha date, PRIMARY KEY(idSolicitud), FOREIGN KEY(idUsuario) REFERENCES usuario(idUsuario))"
    cursor.execute(tabla_usuario)
    cursor.execute(tabla_solicitudes)

def lectura(archivo, cursor):
    current_dir = os.path.dirname(os.path.realpath(__file__)) 
    filename = os.path.join(current_dir, archivo) 
    df = pd.read_csv(filename, delimiter=";", encoding='latin-1')
    insertarFlota(cursor,df)
    insertarCamion(cursor,df)
    insertarRajo(cursor,df)
    insertarDestino(cursor,df)
    insertarZona(cursor,df)
    insertarOrigen(cursor,df)

    


def buscarID(tabla,columna,cursor,idBuscar, dato):
    quer = str("SELECT "+idBuscar+" FROM "+tabla+" WHERE "+columna+" = '"+dato+"'")
    cursor.execute(quer)
    a = cursor.fetchone()
    if a == None:
        quer = "SELECT COUNT(*) FROM" + tabla
        cursor.execute(quer)
        a = cursor.fetchone()
        # no esta en la base de datos y se le crea un nuevo id
        return [0,0]
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


contra = "password"
conexion = psycopg2.connect(host="localhost", database="mineria", user="postgres", password=contra)
cur = conexion.cursor()



archivo = "DatosEjemploDiciembre2.csv"
lectura(archivo,cur)





#creacionTablas(cur)
#creacionTablasUsuarios(cur)
conexion.commit()
conexion.close()
