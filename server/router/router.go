package router

import (
	"github.com/Triptiverma003/blog/controller"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/" , controller.BlogList)
	app.Get("/:id" , controller.BlogDetail)
	app.Post("/" , controller.BlogCreate)
	app.Put("/:id" , controller.BlogUpdate)
	app.Delete("/:id" , controller.BlogDelete)
}