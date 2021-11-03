pipeline{
	agent any
	environment{
		scannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
		CI=false
	}
	stages{
		stage('checkout'){
			steps{
				checkout scm
				sh 'yarn add auth/authAxios'
			}
		}
		stage('analysis'){
			steps{
				nodejs(nodeJSInstallationName: 'node'){
					sh 'npm install'
					sh 'npm run build'
					sh 'npm run test:ci'
					withSonarQubeEnv(installationName:'Sonar Home'){
						sh "${scannerHome}/bin/sonar-scanner"
					}
					sh 'ls'
					sh 'npm uninstall'
					sh 'ls'
				}
			}
		}
	    	stage('deploy'){
			steps{
				withAWS(region: 'us-east-2', credentials: 'aws-creds'){
					s3Upload(bucket: 'ss-scrumptious-artifacts', file: 'build', path: 'restaurant-portal/')
				}
				sh "docker build -t ss-scrumptious-repo:restaurant-portal ."
				script{
					docker.withRegistry("https://419106922284.dkr.ecr.us-east-2.amazonaws.com/","ecr:us-east-2:aws-creds"){
						docker.image("ss-scrumptious-repo:restaurant-portal").push()
					}
				}
				sh "docker system prune -fa"
			}
		}
	}
}
