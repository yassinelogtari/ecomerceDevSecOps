pipeline {
    agent any
    environment {
        PORT = '8000'
        DB_USERNAME = ''
        DB_PASSWORD = ''
        JWT_SECRET_KEY = '2FxXT1NTf2K1Mo4i6AOvtdI'
        JWT_EXPIRES = '7d'
        ACTIVATION_SECRET = '7+SCV1gU5p&VIIU|Pao({#9hQp&Bu0'
        SMPT_SERVICE = 'gmail'
        SMPT_HOST = 'smtp.gmail.com'
        SMPT_PORT = '465'
        SMPT_PASSWORD = ''
        SMPT_MAIL = 'projet.choeur2023@gmail.com'
        STRIPE_API_KEY = 'pk_test_51OyMYQK5DRrMRpsowyB1HVf3stOdWQokSDEC2WJ6kxW85waqdWPABZ7G4lbt0EZfjgawx0PwLHFdfcbvUmuFHRRu00rDFZZOp4'
        STRIPE_SECRET_KEY = 'sk_test_51OyMYQK5DRrMRpsoAC9roVrHFEwCdhjFZKT7u440YYTOlCR7N0jHLRWwOTBNzJ9DVZSIOdPFq8G4UBPeU6CKNdhG00Iz5nKYJ5'
        CLOUDINARY_NAME = 'dpfz8cj8s'
        CLOUDINARY_API_KEY = '562877298298631'
        CLOUDINARY_API_SECRET = 'uP5ywdP139uB473nCofY51c9YNs'
        GENERATE_SOURCEMAP = 'false'
    }
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
                    withCredentials([usernamePassword(credentialsId: 'mongo-credentials', usernameVariable: 'DB_USERNAME', passwordVariable: 'DB_PASSWORD')]) {
                        // Use the DB_USERNAME and DB_PASSWORD variables in your docker-compose command
                        if (isUnix()) {
                            sh 'docker-compose up --build --env DB_USERNAME=$DB_USERNAME --env DB_PASSWORD=$DB_PASSWORD --env GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP'
                        } else {
                            bat 'docker-compose up --build --env DB_USERNAME=%DB_USERNAME% --env DB_PASSWORD=%DB_PASSWORD% --env GENERATE_SOURCEMAP=%GENERATE_SOURCEMAP%'
                        }
                    }
                }
            }
        }
    }
}
