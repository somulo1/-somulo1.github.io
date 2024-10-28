package main

import (
	"database/sql"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func init() {
	var err error
	// Connect to the MySQL database on Railway
	db, err = sql.Open("mysql", "root:rACqzDqWmThPGXqqGGzagNVtmVIFjLCX@tcp(junction.proxy.rlwy.net:23655)/railway")
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	// Serve the main HTML file directly from the root
	http.HandleFunc("/", serveIndex)
	// Handle form submission
	http.HandleFunc("/submit", handleSubmit)

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

	// Start the server on port 8090
	log.Println("Serving on http://localhost:8090")
	err := http.ListenAndServe(":8090", nil)
	if err != nil {
		log.Fatal(err)
	}
}

// serveIndex serves the main HTML file
func serveIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./index.html") // Your main HTML file
}

// handleSubmit processes form submissions
func handleSubmit(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		name := r.FormValue("name")
		email := r.FormValue("email")
		subject := r.FormValue("subject")
		message := r.FormValue("message")

		// Insert data into the database
		_, err := db.Exec("INSERT INTO submissions (name, email, subject, message) VALUES (?, ?, ?, ?)", name, email, subject, message)
		if err != nil {
			http.Error(w, "Unable to save data", http.StatusInternalServerError)
			return
		}

		// Optionally, redirect or show a success message
		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
}
