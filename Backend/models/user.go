package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

// User model
type User struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name           string             `bson:"name" json:"name"`
	Email          string             `bson:"email" json:"email"`
	ProfilePicture string             `bson:"profilePicture,omitempty" json:"profilePicture"`
	Bio            string             `bson:"bio,omitempty" json:"bio"`
	TestsCreated   int                `bson:"testsCreated,omitempty" json:"testsCreated,omitempty"`
	TestsCompleted int                `bson:"testsCompleted,omitempty" json:"testsCompleted,omitempty"`
	AverageScore   float64            `bson:"averageScore,omitempty" json:"averageScore,omitempty"`
	JoinedAt       time.Time          `bson:"joinedAt,omitempty" json:"joinedAt,omitempty"`
	Role           string             `bson:"role" json:"role"` // "teacher" or "student"
	Password       string             `bson:"password,omitempty" json:"-"`
}
type SignUp struct {
	FullName        string `json:"full_name"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
	Role            string `json:"role"`
}
