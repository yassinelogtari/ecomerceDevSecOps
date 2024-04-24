pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Run npm install for both backend and frontend
                    bat 'npm install --prefix ./backend'
                    bat 'npm install --prefix ./frontend'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script{
                    // Adjust the docker-compose command based on the platform
                    if (isUnix()) {
                        sh 'docker-compose up --build'
                    } else {
                        bat 'docker-compose up --build'
                    }
                }
            }
        }
    }
}
