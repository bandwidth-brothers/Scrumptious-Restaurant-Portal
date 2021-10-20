pipeline{
	agent any
	stages{
		stage('checkout'){
			steps{
				checkout scm
			}
		}
		stage('analysis'){
			tools{
				hudson.plugins.sonar.SonarRunnerInstallation 'sonar'
			}
			steps{
				nodejs(nodeJSInstallationName: 'node'){
					sh 'npm install'
					sh 'npm run test --ci --coverage --testResultsProcessor=jest-sonar-reporter --setupFiles=[./src/setupTests.js] --coverageDirectory=reports/coverage'
					withSonarQubeEnv(installationName:'Sonar Home'){
						sh "${scannerHome}/bin/sonar-scanner"
					}
					sh 'npm uninstall'
				}
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
