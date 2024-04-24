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
        stage('SonarQube analysis') {
    def scannerHome = tool '<sonarscanner>'; // must match the name of an actual scanner installation directory on your Jenkins build agent
    withSonarQubeEnv('sonarserver') { // If you have configured more than one global server connection, you can specify its name as configured in Jenkins
      bat "${scannerHome}/bin/sonar-scanner"
    }
  }
        
        stage('Build Images') {
            steps {
                script {
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
