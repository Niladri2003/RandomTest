package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("your_secret_key")

func GenerateJWT(email, role string) string {
	claims := jwt.MapClaims{
		"email": email,
		"role":  role,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, _ := token.SignedString(jwtSecret)
	return ss
}
