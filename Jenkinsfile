pipeline{
	agent any
	stages{
		stage('checkout'){
			steps{
				checkout scm
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
				sh "docker prune -a"
			}
		}
	}
}
