const express = require("express");
const colors = require("colors")
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/DBconfig");
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 6500;
// body parser to read inputs
app.use(express.json());
app.use(express.urlencoded({extended : true}))


// DB Connection
connectDB(); 

// Root Directory
app.get("/", (req, res)=>{
    res.json({
        msg : "Welcome to support desk"
    })
})



// user routes
app.use("/api/user", require("./routes/userRoutes"))


// ticket routes
app.use("/api/ticket", require("./routes/ticketRoutes"))


// error handler
app.use(errorHandler);
  

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`.yellow);
});
