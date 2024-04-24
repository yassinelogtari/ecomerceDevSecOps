pipeline {
    agent any
    stages {
        
        stage('Front-end: npm install') {
            steps {
                // Navigate to the front-end directory and run npm install
                dir('client') {
                    bat 'npm install'
                }
            }
        }
        stage('Back-end: npm install') {
            steps {
                // Navigate to the back-end directory and run npm install
                dir('server') {
                    bat 'npm install'
                }
            }
        }
        // Add more stages for testing, building, deploying, etc.
    }
}
