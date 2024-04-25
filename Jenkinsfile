pipeline {
    agent any
    stages {
        stage('Front-end: npm install') {
            steps {
                // Navigate to the front-end directory and run npm install
                dir('frontend') {
                    bat 'npm install --legacy-peer-deps'
                }
            }
        }
        stage('Back-end: npm install') {
            steps {
                // Navigate to the back-end directory and run npm install
                dir('backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Front-end: Unit Test') {
    steps {
        dir('frontend/src') {
            bat 'npm test'
        }
    }
}
        
         stage('SonarQube analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'sonarscanner'
                    withSonarQubeEnv('sonarserver') {
                       bat "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=pfa"
                    }
                }
            }
        }
        stage('Build Images') {
             steps {
                script {
                        bat 'docker-compose up --build'
                    
                }
            }
        }
    }
}
