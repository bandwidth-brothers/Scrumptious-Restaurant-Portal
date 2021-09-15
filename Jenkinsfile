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
        sh "docker build -t restaurant-portal:latest ."
        sh "docker kill restaurant-portal"
        sh "docker rm restaurant-portal"
        sh "docker run -p 3000:3000 -d --name restaurant-portal restaurantportal:latest"
      }
    }
  }
}
