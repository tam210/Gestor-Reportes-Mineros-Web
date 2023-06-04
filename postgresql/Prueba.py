import sqlalchemy
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
    


def buscarID(tabla,columna,cursor,idBuscar, dato):
    quer = str("SELECT "+idBuscar+" FROM "+tabla+" WHERE "+columna+" = '"+dato+"'")
    cursor.execute(quer)
    a = cursor.fetchone()
    if a == None:
        quer = "SELECT COUNT(*) FROM flota"
        cursor.execute(quer)
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
    #asignacion del ID
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
    


conexion = psycopg2.connect(host="localhost", database="mineria", user="postgres", password="codigo16")
cur = conexion.cursor()



archivo = "DatosEjemploDiciembre2.csv"
lectura(archivo,cur)





#creacionTablas(cur)
#creacionTablasUsuarios(cur)
conexion.commit()
conexion.close()
