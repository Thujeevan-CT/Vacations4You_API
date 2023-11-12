require('dotenv/config')
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDatabase } = require('./src/database');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(fileUpload());
app.use(express.json({ limit: "3mb" }));
app.use("/assets", express.static("assets"));
app.use(morgan("tiny"));
app.use(connectDatabase);

// Routes
const authRoute = require('./src/routes/auth');
app.use('/api/v1/auth', authRoute);
const holidayPackRoute = require('./src/routes/holiday');
app.use('/api/v1/package', holidayPackRoute);

// Swagger API Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("./src/documentation");

app.use(
  '/api/v1/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation)
);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
