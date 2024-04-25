pipeline {
    agent any
    
    stages {
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                script {
                    def dependencyCheckHome = tool name: 'OWASP dependency check'
                    sh "${dependencyCheckHome}/dependency-check.sh \
                        --project MERN \
                        --scan ./ \
                        --format ALL \
                        --out ./"
                }
                step([$class: 'DependencyCheckPublisher', pattern: 'dependency-check-report.xml'])
            }
        }
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
