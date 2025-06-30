// package database

// import (
// 	"log"
// 	"os"

// 	"github.com/Triptiverma003/blog/model"
// 	"gorm.io/driver/mysql"
// 	"gorm.io/gorm"
// 	"gorm.io/gorm/logger"
// )

// var DBConn *gorm.DB

// func ConnectDB() {
// 	user := os.Getenv("db_username")
// 	password := os.Getenv("db_password")
// 	dbname := os.Getenv("db_name")

// 	dsn := user + ":" + password + "@tcp(127.0.0.1:3306)/" + dbname + "?charset=utf8mb4&parseTime=True&loc=Local"

// 	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
// 		Logger: logger.Default.LogMode(logger.Error),
// 	})

// 	if err != nil {
// 		panic("Database is not connected!")
// 	}
// 	log.Println("Connection Successful")

// 	db.AutoMigrate(new(model.Blog))
// 	DBConn = db
// }

package database

import (
	"fmt"
	"log"
	"os"

	"github.com/Triptiverma003/blog/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {
	user := os.Getenv("db_username")
	password := os.Getenv("db_password")
	dbname := os.Getenv("db_name")
	host := os.Getenv("db_hostname")
	port := os.Getenv("port_number") // Use this

	// ✅ Build DSN using host and port
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user, password, host, port, dbname)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})

	if err != nil {
		log.Fatal("❌ Database connection failed:", err)
	}
	log.Println("✅ Database connection successful")

	// Auto migrate models
	db.AutoMigrate(&model.Blog{})

	DBConn = db
}