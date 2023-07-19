import { CronJob } from 'cron';

export class ETLScheduler {
  private job: CronJob;

  constructor() {
    // Define el patrón cron para ejecutar la tarea cada día a las 08:30
    const cronPattern = '30 08 * * *';

    // Crea una nueva instancia de CronJob
    this.job = new CronJob(cronPattern, () => this.runETL());
  }

  start() {
    // Inicia el planificador de tareas
    this.job.start();
  }

  private runETL() {
    // Lógica para ejecutar el archivo Python ETL.py
    // Aquí puedes usar child_process.spawn o cualquier otra forma de ejecutar un archivo Python desde Node.js
    // Por ejemplo:
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python', ['../postgresql/ETL.py']);

    // Manejo de eventos del proceso Python
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Salida de Python: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error de Python: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Proceso de Python finalizado con código de salida: ${code}`);
    });
  }
}
