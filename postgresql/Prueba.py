import sqlalchemy
import pandas as pd
import psycopg2

def creacionTablas(cursor):
    tabla_flota = "DROP TABLE IF EXISTS flota; CREATE TABLE flota(idFlota INT NOT NULL, nombre text, PRIMARY KEY (idFlota))"
    tabla_camion = "DROP TABLE IF EXISTS camion; CREATE TABLE camion(idCamion INT NOT NULL, idFlota INT NOT NULL, patente text, PRIMARY KEY (idCamion), FOREIGN KEY (idFlota) REFERENCES flota(idFlota))"
    tabla_rajo = "DROP TABLE IF EXISTS rajo; CREATE TABLE rajo(idRajo INT NOT NULL, nombre text, PRIMARY KEY(idRajo))"
    tabla_destino = "DROP TABLE IF EXISTS destino; CREATE TABLE destino(idDestino INT NOT NULL, idRajo INT NOT NULL, nombre text, PRIMARY KEY (idDestino), FOREIGN KEY(idRajo) REFERENCES rajo(idRajo))"
    tabla_zona = "DROP TABLE IF EXISTS zona; CREATE TABLE zona(idZona INT NOT NULL, idRajo INT NOT NULL, nombre text, PRIMARY KEY (idZona), FOREIGN KEY(idRajo) REFERENCES rajo(idRajo))"
    tabla_origen = "DROP TABLE IF EXISTS origen; CREATE TABLE origen(idOrigen INT NOT NULL, idZona INT NOT NULL, nombre text, PRIMARY KEY(idOrigen), FOREIGN KEY(idZona) REFERENCES zona(idZona))"
    tabla_viaje = "DROP TABLE IF EXISTS viaje; CREATE TABLE viaje(idViaje INT NOT NULL, idCamion INT NOT NULL, idOrigen INT NOT NULL, idDestino INT NOT NULL, fecha date, ciclo int, tonelaje float, material text, PRIMARY KEY(idViaje), FOREIGN KEY(idCamion) REFERENCES camion(idCamion), FOREIGN KEY (idOrigen) REFERENCES origen(idOrigen), FOREIGN KEY(idDestino) REFERENCES destino(idDestino))"
    
    cursor.execute(tabla_flota)
    cursor.execute(tabla_camion)
    cursor.execute(tabla_rajo)
    cursor.execute(tabla_destino)
    cursor.execute(tabla_zona)
    cursor.execute(tabla_origen)
    cursor.execute(tabla_viaje)
    
    
conexion = psycopg2.connect(host="localhost", database="mineria", user="postgres", password="codigo16")
cur = conexion.cursor()
creacionTablas(cur)
conexion.commit()
conexion.close()