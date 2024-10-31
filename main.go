package main

import (
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"text/template"
)

var allowedRoutes = map[string]bool{
	"/":           true,
	"/send-email": true,
}

func main() {
	mux := http.NewServeMux()
	RegisterRoutes(mux)

	wrappedMux := RouteChecker(mux)

	server := &http.Server{
		Addr:    ":8080",
		Handler: wrappedMux,
	}

	fmt.Println("Server running @http://localhost:8080\n=====================================")
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal("Error running server: ", err)
	}
}

// RouteChecker is a middleware that checks allowed routes
func RouteChecker(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if _, ok := allowedRoutes[r.URL.Path]; !ok {
			http.Error(w, "Not found", http.StatusNotFound)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func RegisterRoutes(mux *http.ServeMux) {
	// Serve static files directly from the home directory
	mux.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css"))))
	mux.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))
	mux.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("./img"))))
	mux.Handle("/lib/", http.StripPrefix("/lib/", http.FileServer(http.Dir("./lib"))))

	// Serve HTML files directly from the home directory
	mux.HandleFunc("/", HomeHandler)
	mux.HandleFunc("/send-email", handleEmailSend)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		templatePath := "./index.html" // Serve the main index.html file
		serveTemplate(w, templatePath)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// serveTemplate renders the specified template file
func serveTemplate(w http.ResponseWriter, templatePath string) {
	tmpl, err := template.ParseFiles(templatePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func handleEmailSend(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	name := r.FormValue("name")
	email := r.FormValue("email")
	message := r.FormValue("message")

	// Configure email settings
	from := "mcomulosammy37@gmail.com"
	password := "your-app-password" // Use an app password for Gmail
	to := "samuelokothomulo37@gmail.com"
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Compose email
	subject := "New Contact Form Submission"
	body := fmt.Sprintf("Name: %s\nEmail: %s\nMessage: %s", name, email, message)
	msg := []byte(fmt.Sprintf("To: %s\r\nSubject: %s\r\n\r\n%s", to, subject, body))

	// Authentication
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Send email
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, msg)
	if err != nil {
		log.Printf("Error sending email: %v", err)
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Email sent successfully")
}
