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
       stage('Code Analysis with SonarQube') {
            steps {
                script {
                    def scannerHome = tool name: 'sonarscanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('sonarserver') { // Update the SonarQube installation name here
                        bat "${SCANNER_HOME**}**}/bin/sonar-scanner -Dsonar.projectKey=<pfa> -Dsonar.sources=<src>"
                    }
                }
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
