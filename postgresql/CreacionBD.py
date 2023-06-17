import pandas as pd
import psycopg2


def creacionTablasDatos(cursor):
    tabla_flota = "DROP TABLE IF EXISTS flota; CREATE TABLE flota(idFlota INT NOT NULL, nombre text, PRIMARY KEY (idFlota))"
    tabla_camion = "DROP TABLE IF EXISTS camion; CREATE TABLE camion(idCamion INT NOT NULL, idFlota INT NOT NULL, patente text, PRIMARY KEY (idCamion), FOREIGN KEY (idFlota) REFERENCES flota(idFlota))"
    tabla_rajo = "DROP TABLE IF EXISTS rajo; CREATE TABLE rajo(idRajo INT NOT NULL, nombre text, PRIMARY KEY(idRajo))"
    tabla_destino = "DROP TABLE IF EXISTS destino; CREATE TABLE destino(idDestino INT NOT NULL, idRajo INT NOT NULL, nombre text, PRIMARY KEY (idDestino), FOREIGN KEY(idRajo) REFERENCES rajo(idRajo))"
    tabla_zona = "DROP TABLE IF EXISTS zona; CREATE TABLE zona(idZona INT NOT NULL, idRajo INT NOT NULL, nombre text, PRIMARY KEY (idZona), FOREIGN KEY(idRajo) REFERENCES rajo(idRajo))"
    tabla_origen = "DROP TABLE IF EXISTS origen; CREATE TABLE origen(idOrigen INT NOT NULL, idZona INT NOT NULL, nombre text, PRIMARY KEY(idOrigen), FOREIGN KEY(idZona) REFERENCES zona(idZona))"
    tabla_carguio = "DROP TABLE IF EXISTS carguio; CREATE TABLE carguio(idcarguio INT NOT NULL, nombre text, PRIMARY KEY (idcarguio))"
    tabla_Fecha = "DROP TABLE IF EXISTS fecha; CREATE TABLE Fecha(idFecha INT NOT NULL, fecha date, PRIMARY KEY (idFecha))"
    tabla_viaje = "DROP TABLE IF EXISTS viaje; CREATE TABLE viaje(idViaje INT NOT NULL, idCarguio INT NOT NULL, idFecha INT NOT NULL, idCamion INT NOT NULL, idOrigen INT NOT NULL, idDestino INT NOT NULL, ciclos int, tonelaje INT, tonelajeReal INT, material text, PRIMARY KEY(idViaje), FOREIGN KEY(idCarguio) REFERENCES carguio(idCarguio), FOREIGN KEY(idFecha) REFERENCES fecha(idFecha), FOREIGN KEY(idCamion) REFERENCES camion(idCamion), FOREIGN KEY (idOrigen) REFERENCES origen(idOrigen), FOREIGN KEY(idDestino) REFERENCES destino(idDestino))"
    tabla_Kpi = "DROP TABLE IF EXISTS Kpi; CREATE TABLE Kpi(idKpi INT NOT NULL, idRajo INT NOT NULL, idFecha INT NOT NULL, esperado INT, real INT, PRIMARY KEY (idKpi), FOREIGN KEY (idRajo) REFERENCES rajo(idRajo),FOREIGN KEY (idFecha) REFERENCES fecha(idFecha) )"

    cursor.execute(tabla_flota)
    cursor.execute(tabla_camion)
    cursor.execute(tabla_rajo)
    cursor.execute(tabla_destino)
    cursor.execute(tabla_zona)
    cursor.execute(tabla_origen)
    cursor.execute(tabla_carguio)
    cursor.execute(tabla_Fecha)
    cursor.execute(tabla_viaje)
    cursor.execute(tabla_Kpi)

def creacionTablasUsuarios(cursor):
    tabla_usuario = "DROP TABLE IF EXISTS usuario; CREATE TABLE usuario(idUsuario INT NOT NULL, nombre text, apellido text, correo text, pass text, tipoUsuario INT, PRIMARY KEY (idUsuario))"
    tabla_solicitudes = "DROP TABLE IF EXISTS solicitud; CREATE TABLE solicitud(idSolicitud INT NOT NULL, idUsuario INT NOT NULL, estado boolean, fecha date, PRIMARY KEY(idSolicitud), FOREIGN KEY(idUsuario) REFERENCES usuario(idUsuario))"
    cursor.execute(tabla_usuario)
    cursor.execute(tabla_solicitudes)

contra = "codigo16"
conexion = psycopg2.connect(host="localhost", database="mineriaDB", user="postgres", password=contra)
cur = conexion.cursor()

creacionTablasDatos(cur)
creacionTablasUsuarios(cur)

conexion.commit()
conexion.close()