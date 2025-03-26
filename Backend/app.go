package main

import (
	"flag"
	"github.com/Niladri2003/RandomTest/Backend/database"
	Auth "github.com/Niladri2003/RandomTest/Backend/handlers/Auth"
	"github.com/Niladri2003/RandomTest/Backend/pkg/middleware"
	"github.com/joho/godotenv"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	port = flag.String("port", ":3000", "Port to listen on")
	prod = flag.Bool("prod", false, "Enable prefork in Production")
)

func main() {
	// Parse command-line flags
	flag.Parse()
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file", err)
	}

	// Connected with database
	database.Connect()

	// Create fiber app
	app := fiber.New(fiber.Config{
		Prefork: *prod, // go run app.go -prod
	})

	// Middleware
	app.Use(recover.New())
	app.Use(logger.New())
	middleware.FiberMiddleware(app)

	// Create a /api/v1 endpoint
	v1 := app.Group("/api/v1")

	// Bind handlers
	//v1.Get("/users", handlers.UserList)
	//v1.Post("/users", handlers.UserCreate)
	v1.Post("/auth/signup", Auth.Signup)
	v1.Get("/auth/google", Auth.HandleGoogleLogin)
	v1.Get("/auth/google/callback", Auth.HandleGoogleCallback)

	// Setup static files
	app.Static("/", "./static/public")

	// Handle not founds
	//app.Use(handlers.NotFound)

	// Listen on port 3000
	log.Fatal(app.Listen(*port)) // go run app.go -port=:3000
}
