const cluster = require('cluster');
const http = require('http');
const { setupMaster } = require('@socket.io/sticky');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

  const httpServer = http.createServer();
  setupMaster(httpServer, {
    loadBalancingMethod: 'least-connection'
  });
  const PORT = process.env.PORT || 8080;

  httpServer.listen(PORT, () => console.log(`Server Listening at ${PORT}`));
} else {
  console.log(`Worker ${process.pid} started`);
  require('./index');
}
