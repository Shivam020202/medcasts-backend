module.exports = {
  apps: [
    {
      name: "medcasts-backend",
      script: "./dist/server.js",
      instances: 2,
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
      max_memory_restart: "1G",
      watch: false,
      max_restarts: 10,
      min_uptime: "10s",
      autorestart: true,
    },
  ],
};
