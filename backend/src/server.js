const app = require("./app");

const config =
  require("./config/config");

const {
  testDatabaseConnection
} = require("./config/database");

// ============================================================
// START SERVER
// ============================================================

async function startServer() {

  try {

    // --------------------------------------------------------
    // TEST DATABASE
    // --------------------------------------------------------

    const databaseConnected =
      await testDatabaseConnection();

    if (!databaseConnected) {

      console.error(
        "❌ Server not started because database connection failed."
      );

      process.exit(1);
    }

    console.log(
      "✅ Database connected successfully"
    );

    // --------------------------------------------------------
    // START EXPRESS
    // --------------------------------------------------------

    app.listen(
      config.PORT,
      "0.0.0.0",
      () => {

        console.log(
          `🚀 Server running on http://localhost:${config.PORT}`
        );

        console.log(
          `🌍 Environment: ${config.NODE_ENV}`
        );

        console.log(
          "🔐 Auth API: http://localhost:" +
          `${config.PORT}/api/auth`
        );
      }
    );

  } catch (error) {

    console.error(
      "❌ Server startup error:",
      error.message
    );

    process.exit(1);
  }
}

// ============================================================
// ERROR HANDLING
// ============================================================

process.on(
  "unhandledRejection",
  (reason) => {

    console.error(
      "Unhandled Rejection:",
      reason
    );

    process.exit(1);
  }
);

process.on(
  "uncaughtException",
  (error) => {

    console.error(
      "Uncaught Exception:",
      error
    );

    process.exit(1);
  }
);

// ============================================================
// START
// ============================================================

startServer();