package main

import (
	"log"
	"net/http"
)

func main() {
	// Serve the main HTML file directly from the root
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./index.html") // Your main HTML file
	})

	// Serve portfolio files and subdirectories from the portfolio directory
	http.Handle("/portfolio/", http.StripPrefix("/portfolio/", http.FileServer(http.Dir("./portfolio"))))

	// Serve CSS files from the css directory
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css"))))

	// Serve JavaScript files from the js directory
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))

	// Serve images from the img directory, including subdirectories
	http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("./img"))))

	// Serve libraries from the lib directory, including subdirectories
	http.Handle("/lib/", http.StripPrefix("/lib/", http.FileServer(http.Dir("./lib"))))

	// Start the server on port 8080
	log.Println("Serving on http://localhost:8090")
	err := http.ListenAndServe(":8090", nil)
	if err != nil {
		log.Fatal(err)
	}
}
