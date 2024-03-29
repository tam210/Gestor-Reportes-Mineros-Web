# Gestor de reportes mineros


El presente proyecto tiene como finalidad desarrollar un sistema de software web para monitorear el movimiento de material del área minera. Será posible descargar reportes en excel según distintos tipos de vistas: Diarias, semanales, semanales ISO, mensuales y anuales. El sistema estará diseñado para ser utilizado por personal autorizado el cual se dividirá en 2 tipos: Administradores (quienes pueden modificar la información) y Usuarios (quienes solo pueden ver los reportes).
<br>

### Últimos cambios

- [x] Cambio en el modelamiento de BD: Se añadió un id al usuario con el identificador uuid4 de postgres. Se hizo necesario porque al hacer cambios en un usuario saldría su correo en el endpoint. Por medidas preventivas se creó el id autogenerado.
- [x] Se pueden visualizar los reportes filtrados por rajo y un rango de fechas.
- [x] Se reorganizó el tratamiento de las solicitudes, asegurando que se creen al mismo tiempo usando transacciones. El método que crea a usuario y solicitud está en el servicio de usuario.
- [x] Carga periódica de datos (se instaló cron desde la terminal)
- [x] La consulta de la vista se puede hacer más eficiente, se pueden reducir cláusulas pero no estoy segura o,o (consultar)
- [x] Actualizar y eliminar usuarios: La actualización se hizo considerando las excepciones de correos repetidos, y la eliminación no consiste en borrar el usuario (sino causaría problemas con las solicitudes por el id manualmente autoincremental) sino que le cambia el estado a 4 (Eliminado), así siempre quedará registrado en el sistema.
- [x] Actualizar el factor de carga

### Por realizar
Todas las tareas han sido finalizadas

<p align="center">
  <img width="330" src="docs/assets/github-asset.png">
</p>
