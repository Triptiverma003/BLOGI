package main

import (
	"log"

	"github.com/Triptiverma003/blog/database"
	"github.com/Triptiverma003/blog/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init(){
	if err := godotenv.Load(".env"); err!= nil{
		log.Fatal("Error in loading .env file")
	}
	database.ConnectDB()
}
func main(){

	sqlDb , err := database.DBConn.DB()

	if err!= nil{
		panic("Error in SQL connection")
	}
	defer sqlDb.Close()
	app := fiber.New()
	app.Static("/static", "./static")


	// Or extend your config for customization
	app.Use(cors.New(cors.Config{
    AllowOrigins: "*",
    AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use(logger.New())

	router.SetupRoutes(app)

	app.Listen(":8000")
}