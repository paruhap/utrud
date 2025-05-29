module.exports = {
  apps: [
    {
      name: "utrud",
      exec_mode: "cluster",
      instances: "1", // Для начала используйте 1 инстанс
      script: "npm",
      args: "run start", // Будет использовать nuxt start
      cwd: "/var/www/html/utrud", // Полный путь к проекту
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}