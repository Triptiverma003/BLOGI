package main

import (
	"log"
	"os"

	"github.com/Triptiverma003/blog/database"
	"github.com/Triptiverma003/blog/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error in loading .env file")
	}
	database.ConnectDB()
}
func main() {

	sqlDb, err := database.DBConn.DB()

	if err != nil {
		panic("Error in SQL connection")
	}
	defer sqlDb.Close()
	app := fiber.New()
	app.Static("/static", "./static")

	// Or extend your config for customization
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "https://blogi-zeta.vercel.app",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	app.Use(logger.New())

	router.SetupRoutes(app)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" // fallback default
	}

	log.Printf("Server is running on port %s", port)
	log.Fatal(app.Listen(":" + port))
}
