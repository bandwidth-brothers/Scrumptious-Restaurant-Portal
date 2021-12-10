pipeline {
    agent any
    
    stages{

		stage('checkout'){
			steps{
				checkout scm
			}
		}

        stage('Build'){
            steps{
                sh 'npm install --force'
                sh 'CI=false npm run build'
            }
        }
        
        stage('Deploy'){
            steps{
                withAWS(region: 'us-east-2', credentials: 'ecr_credentials'){
                    sh 'aws s3 cp ./build/ s3://restaurant-ui-test --recursive --acl public-read'
              }
            }
        }
    }

}
