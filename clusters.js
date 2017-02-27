// set up clustering
// load the module cluster, verify it is the master
// if master, a loop will be iterated based on
// total of processing cores
// When a child cluster is started, the application
// is started via "index.js"
import cluster from "cluster";
import os from "os";

const CPUS = os.cpus();
if (cluster.isMaster) {
    CPUS.forEach(() => cluster.fork());
    cluster.on("listening", worker => {
        console.log("[INFO] Cluster %d connected", worker.process.pid);
    });
    cluster.on("disconnect", worker => {
        console.log("[INFO] Cluster %d disconnected", worker.process.pid);
    });
    cluster.on("exit", worker => {
        console.log("[INFO] Cluster %d is dead", worker.process.pid);
        // ensure start of a new cluster if an old one dies
        cluster.fork();
    });
} else {
    require("./index.js");
}