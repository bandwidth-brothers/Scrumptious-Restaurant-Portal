FROM joshuagreen424/react-docker
COPY . /home/react_app
RUN npm install --prefix /home/react_app
ENTRYPOINT npm start --prefix /home/react_app
