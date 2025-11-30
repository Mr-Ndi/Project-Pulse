package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	//creating a gin router harimo default middle ware like: logging,recovery,etc
	rimwe := gin.Default()

	//defining a simple get request to /bite path
	rimwe.GET("/bite", func(c *gin.Context) {
		//responding with a json object
		c.JSON(200, gin.H{
			"Ubutumwa": "Hii  :) !!",
			"status":   "Byakunze, can't u tell pls",
		})
	})

	//defining a simple post request for bite2
	rimwe.POST("/bite2", func(c *gin.Context) {
		var json map[string]interface{}
		if err := c.BindJSON(&json); err != nill {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"Message": "Kohereza request",
			"datum":   "sample datum",
		})
	})

	//starting the server on given port
	rimwe.Run(":8000")
}
