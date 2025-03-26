package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func Connect() {
	mongoURI := os.Getenv("MONGO_URI")
	dbName := os.Getenv("MONGO_DB")

	clientOptions := options.Client().ApplyURI(mongoURI)

	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal("Failed to create MongoDB client:", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal("MongoDB connection failed:", err)
	}

	// Check the connection
	if err = client.Ping(ctx, nil); err != nil {
		log.Fatal("MongoDB ping failed:", err)
	}

	log.Println("✅ MongoDB connected")
	DB = client.Database(dbName)
}
