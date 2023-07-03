# Gestor de reportes mineros


El presente proyecto tiene como finalidad desarrollar un sistema de software web para monitorear el movimiento de material del área minera. Será posible descargar reportes en excel según distintos tipos de vistas: Diarias, semanales, semanales ISO, mensuales y anuales. El sistema estará diseñado para ser utilizado por personal autorizado el cual se dividirá en 2 tipos: Administradores (quienes pueden modificar la información) y Usuarios (quienes solo pueden ver los reportes).
<br>

### Últimos cambios

- [x] Cambio en el modelamiento de BD: Se añadió un id al usuario con el identificador uuid4 de postgres. Se hizo necesario porque al hacer cambios en un usuario saldría su correo en el endpoint. Por medidas preventivas se creó el id autogenerado.
- [x] Se pueden visualizar los reportes filtrados por rajo y un rango de fechas.
- [x] Se reorganizó el tratamiento de las solicitudes, asegurando que se creen al mismo tiempo usando transacciones. El método que crea a usuario y solicitud está en el servicio de usuario.
- [x] Carga periódica de datos (se instaló cron desde la terminal)
- [x] La consulta de la vista se puede hacer más eficiente, se pueden reducir cláusulas pero no estoy segura o,o (consultar)

### Por realizar
- [ ] Actualizar y eliminar usuarios
- [ ] Actualizar el factor de carga
- [ ] La vista ya está funcionando, pero no se genera a partir del rajo y fechas, sino que se genera la vista de TODOS los registros y después se puede filtrar por rajo y fechas. Consultar si es viable la solución actual o hay que hacer modificaciones.



<p align="center">
  <img width="330" src="docs/assets/github-asset.png">
</p>
