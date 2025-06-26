package controller

import (
	"log"
	"time"
	"os"
	"github.com/Triptiverma003/blog/database"
	"github.com/Triptiverma003/blog/model"
	"github.com/gofiber/fiber/v2"
)

func BlogList(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText" : "Ok",
		"msg" : "BlogList",
	}

	time.Sleep(time.Millisecond * 1500)

	db := database.DBConn

	var records []model.Blog

	db.Find(&records)

	context["blog_records"] = records

	c.Status(200)
	return c.JSON(context)
}

func BlogDetail(c *fiber.Ctx)error {
	context := fiber.Map{
		"statusText" : "Ok",
		"msg" : "Updated BlogList",
	}

	id := c.Params("id")

	var record model.Blog
	database.DBConn.First(&record, id)

	if record.ID == 0{
		log.Println("record not found")
		context["msg"] = "Record not found"

		c.Status(404)
		c.JSON(context)
	}
	context["record"] = record
	context["statusText"] = "Ok"
	context["msg"] = "Blog Detail"
	c.Status(200)
	return c.JSON(context)
}

func BlogCreate(c *fiber.Ctx)error{

	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Add a Blog",
	}

	record := new(model.Blog)

	if err := c.BodyParser(record); err != nil {
		log.Println("Error in parsing request.")
		context["statusText"] = ""
		context["msg"] = "Something went wrong."
	}

	// File upload
	file, err := c.FormFile("file")

	if err != nil {
		log.Println("Error in file upload.", err)
	}

	if file.Size > 0 {
		filename := "./static/uploads/" + file.Filename

		if err := c.SaveFile(file, filename); err != nil {
			log.Println("Error in file uploading...", err)
		}

		// Set image path to the struct
		record.Image = filename
	}

	result := database.DBConn.Create(record)

	if result.Error != nil {
		log.Println("Error in saving data.")
		context["statusText"] = ""
		context["msg"] = "Something went wrong."
	}

	context["msg"] = "Record is saved successully."
	context["data"] = record

	c.Status(201)
	return c.JSON(context)
}

// Update  a Blog
func BlogUpdate(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Update Blog",
	}

	//http://localhost:8000/2

	id := c.Params("id")

	var record model.Blog

	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not Found.")

		context["statusText"] = ""
		context["msg"] = "Record not Found."
		c.Status(400)
		return c.JSON(context)
	}

	if err := c.BodyParser(&record); err != nil {
		log.Println("Error in parsing request.")

		context["msg"] = "Something went wrong."
		c.Status(400)
		return c.JSON(context)
	}
	// File upload
	file, err := c.FormFile("file")

	if err != nil {
		log.Println("Error in file upload.", err)
	}

	if file.Size > 0 {
		filename := "static/uploads/" + file.Filename

		if err := c.SaveFile(file, filename); err != nil {
			log.Println("Error in file uploading...", err)
		}

		// Set image path to the struct
		record.Image = filename
	}

	result := database.DBConn.Save(record)

	if result.Error != nil {
		log.Println("Error in saving data.")

		context["msg"] = "Error in saving data."
		c.Status(400)
		return c.JSON(context)
	}

	context["msg"] = "Record updated successfully."
	context["data"] = record

	c.Status(200)
	return c.JSON(context)
}



func BlogDelete(c *fiber.Ctx) error{

	context := fiber.Map{
		"statusText" : "Ok",
		"msg" : "Updated BlogList",
	}

	id := c.Params("id")

	var record model.Blog
	database.DBConn.First(&record, id)

	if record.ID == 0{
		log.Println("record not found")
		context["msg"] = "Record not found"

		c.Status(400)
		c.JSON(context)
	}

	fileName := record.Image 

	err := os.Remove(fileName)

	if err != nil {
		log.Println("Error in deleting" , err)
	}

	result := database.DBConn.Delete(record)

	if result.Error != nil {
		context["msg"] = "Something went wrong"
		return c.JSON(context)
	}



	context["statusText"] = "Record deleted Successfully"
	context["msg"] = "Record deleted successfully"
	c.Status(200)
	return c.JSON(context)
}
