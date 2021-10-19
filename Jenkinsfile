pipeline{
	agent {
	    docker {image "node:latest"}
	}
	stages{
		stage('checkout'){
			steps{
				checkout scm
			}
		}
		stage('analysis'){
			steps{
				sh 'npm install'
				sh 'npm run test:ci'
			}
		}
	    	stage('deploy'){
			steps{
				sh "docker build -t ss-scrumptious-repo:restaurant-portal ."
				script{
					docker.withRegistry("https://419106922284.dkr.ecr.us-east-2.amazonaws.com/","ecr:us-east-2:aws-creds"){
						docker.image("ss-scrumptious-repo:restaurant-portal").push()
					}
				}
				sh "docker image rm ss-scrumptious-repo:restaurant-portal"
				sh "docker image rm 419106922284.dkr.ecr.us-east-2.amazonaws.com/ss-scrumptious-repo:restaurant-portal"
			}
		}
	}
}
