package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv" // load .env locally
	"github.com/Triptiverma003/blog/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
	// Load .env file for local dev (ignore error in prod)
	_ = godotenv.Load()

	user := os.Getenv("db_username")
	password := os.Getenv("db_password")
	dbname := os.Getenv("db_name")
	host := os.Getenv("db_hostname")
	port := os.Getenv("port_number")

	if user == "" || password == "" || dbname == "" || host == "" || port == "" {
		log.Fatal("❌ Missing database environment variables")
	}

	// ✅ Railway often requires TLS
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local&tls=skip-verify",
		user, password, host, port, dbname)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		log.Fatal("❌ Database connection failed:", err)
	}

	log.Println("✅ Database connection successful")

	// Auto migrate models
	if err := db.AutoMigrate(&model.Blog{}); err != nil {
		log.Fatal("❌ Migration failed:", err)
	}

	DBConn = db
}
