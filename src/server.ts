import app from "./app";
import config from "./config/env";
import sequelize from "./config/db";
import logger from "./utils/logger";

async function startServer() {
  try {
    await sequelize.authenticate();
    logger.log("✅ Database connected");

    await sequelize.sync();
    logger.log("✅ Database synced");

    const server = app.listen(config.port, () => {
      logger.log(`🚀 Server running on port ${config.port}`);
    });

    process.on("SIGINT", async () => {
      logger.log("🧹 Shutting down...");
      await sequelize.close();
      server.close(() => process.exit(0));
    });
  } catch (err) {
    logger.error("❌ Startup error", err);
    process.exit(1);
  }
}

startServer();
