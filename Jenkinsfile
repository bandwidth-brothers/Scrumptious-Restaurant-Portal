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
        try{
          sh "docker kill restaurant-portal"
          sh "docker rm restaurant-portal"
        } catch(err){
          sh "echo pass"
        }
        sh "docker run -p 3000:3000 -d --name restaurant-portal restaurant-portal:latest"
      }
    }
  }
}
