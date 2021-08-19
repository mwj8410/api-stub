'use strict';

class ServiceRegistry {
  static instance;

  constructor() {
    this.services = {};
  }

  static get() {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  register(serviceName, serviceReference) {
    console.log(`Registering ${serviceName}`);
    const newServicePartial = {
      [serviceName]: serviceReference
    };

    this.services = Object.assign({}, newServicePartial, this.services);
  }

  allReady() {
    const ready = [];
    const notReady = [];
    for (const [key, service] of Object.entries(this.services)) {
      if (service.isReady()) {
        ready.push('key');
        console.log(`Service Ready: ${key}`);
      } else {
        console.log(`Service Not Ready: ${key}`);
        notReady.push('key');
      }
    }
    console.log(`Services Ready: ${ready.length}`);
    console.log(`Services not Ready: ${notReady.length}`);
    return notReady.length === 0;
  }
}

module.exports = ServiceRegistry;
