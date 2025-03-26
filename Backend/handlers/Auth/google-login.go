package Auth

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/Niladri2003/RandomTest/Backend/database"
	"github.com/Niladri2003/RandomTest/Backend/models"
	"github.com/Niladri2003/RandomTest/Backend/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"log"
	"os"
	"time"
)

var googleOAuthConfig *oauth2.Config

func init() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	googleOAuthConfig = &oauth2.Config{
		ClientID:     os.Getenv("YOUR_GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("YOUR_GOOGLE_CLIENT_SECRET"),
		RedirectURL:  "http://127.0.0.1:3000/api/v1/auth/google/callback",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}
}

func Signup(c *fiber.Ctx) error {

	// Create a new user auth struct
	signup := &models.SignUp{}

	if err := c.BodyParser(signup); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid request", "error": true})

	}
	if signup.Password != signup.ConfirmPassword {
		return c.Status(400).JSON(fiber.Map{"message": "Passwords do not match", "error": true})
	}
	// Check if user with the same email already exists
	collection := database.DB.Collection("users")
	var existingUser models.User
	err := collection.FindOne(context.TODO(), bson.M{"email": signup.Email}).Decode(&existingUser)
	if err == nil {
		return c.Status(400).JSON(fiber.Map{"message": "Email already in use", "error": true})
	}

	//Todo: implement password hashing

	newUser := models.User{
		ID:             primitive.NewObjectID(), // ✅ Explicit ObjectID generation (Mongo will do this if you omit too)
		Name:           signup.FullName,
		Email:          signup.Email,
		Bio:            "",
		ProfilePicture: "",
		TestsCreated:   0,
		TestsCompleted: 0,
		AverageScore:   0,
		Password:       signup.Password,
		Role:           signup.Role,
		JoinedAt:       time.Now(),
	}
	collection = database.DB.Collection("users")
	_, err = collection.InsertOne(context.TODO(), newUser)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Could not create user", "error": true})
	}
	// Store user in your DB here (mocked now)
	token := utils.GenerateJWT(signup.Email, signup.Role)

	return c.JSON(fiber.Map{
		"token": token,
		"user":  newUser,
	})

}

func HandleGoogleLogin(c *fiber.Ctx) error {
	log.Println(os.Getenv("YOUR_GOOGLE_CLIENT_ID"))
	url := googleOAuthConfig.AuthCodeURL("random-state", oauth2.AccessTypeOffline)
	log.Println(url)

	return c.Redirect(url)
}

func HandleGoogleCallback(c *fiber.Ctx) error {
	// Get the authorization code from the URL
	code := c.Query("code")

	// Exchange the authorization code for an access token
	token, err := googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Println("Error exchanging code:", err)
		return c.Status(400).SendString("Error with OAuth exchange")
	}

	// Use the token to get user information from Google
	client := googleOAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		log.Println("Error getting user info:", err)
		return c.Status(400).SendString("Error fetching user info from Google")
	}
	defer resp.Body.Close()

	// Parse the user info
	var profile struct {
		ID    string `json:"id"`
		Name  string `json:"name"`
		Email string `json:"email"`
	}
	err = json.NewDecoder(resp.Body).Decode(&profile)
	if err != nil {
		log.Println("Error parsing Google user data:", err)
		return c.Status(400).SendString("Error parsing user data")
	}

	// Check if the user already exists in the database
	collection := database.DB.Collection("users")
	var existingUser models.User
	err = collection.FindOne(context.Background(), bson.M{"email": profile.Email}).Decode(&existingUser)
	if err != nil {
		// User doesn't exist, create a new user
		newUser := models.User{
			ID:             primitive.NewObjectID(),
			Name:           profile.Name,
			Email:          profile.Email,
			ProfilePicture: "", // Google profile pictures can be added here if needed
			Bio:            "",
			TestsCreated:   0,
			TestsCompleted: 0,
			AverageScore:   0,
			JoinedAt:       time.Now(),
			Role:           "student", // Default to "student", or customize it based on email/domain
		}

		// Insert the new user into the database
		_, err := collection.InsertOne(context.Background(), newUser)
		if err != nil {
			log.Println("Error saving new user:", err)
			return c.Status(500).SendString("Error creating new user in the database")
		}
	}

	// Generate a JWT token for the user
	tokenStr := utils.GenerateJWT(profile.Email, "student") // or retrieve user's role from DB if needed

	// Redirect the user with the token
	redirectURL := fmt.Sprintf("http://localhost:5173/?token=%s", tokenStr)
	return c.Redirect(redirectURL)
}
