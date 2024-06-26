pipeline {
    agent any
    
    stages {
        stage('Front-end: npm install') {
            steps {
                dir('frontend') {
                    bat 'npm install --legacy-peer-deps'
                }
            }
        }
        
        stage('Back-end: npm install') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }
        
        stage('Socket: npm install') {
            steps {
                dir('socket') {
                    bat 'npm install'
                }
            }
        }
        
        stage('SonarQube analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'sonarscanner'
                    withSonarQubeEnv('sonarserver') {
                        bat "${scannerHome}\\bin\\sonar-scanner -Dsonar.projectKey=pfa"
                    }
                }
            }
        }

         stage('OWASP Dependency-Check Vulnerabilities') {
      steps {
        dependencyCheck additionalArguments: ''' 
                    -o './'
                    -s './'
                    -f 'ALL' 
                    --prettyPrint''', odcInstallation: 'OWASP dependency check'
        
        dependencyCheckPublisher pattern: 'dependency-check-report.xml'
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
