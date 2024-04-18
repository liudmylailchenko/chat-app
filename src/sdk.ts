import { faker } from "@faker-js/faker";
import { EventEmitter } from "events";

const MAX_INTERVAL = 7_000;

const users = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  //   "Eve",
  // 'Frank',
  // 'Grace',
  // 'Heidi',
  // 'Ivan',
  // 'Judy',
];

class SDK extends EventEmitter {
  constructor() {
    super();

    this.run();
    this.message();
  }

  private run() {
    setTimeout(() => {
      this.emit("typing", {
        user: this.getRandomUser(),
      });

      this.run();
    }, this.getRandomInterval());
  }

  subscribe(event: "message" | "typing", callback: (data: any) => void) {
    this.on(event, callback);
  }

  unSubscribe(event: "message" | "typing") {
    this.removeAllListeners(event);
  }

  private message() {
    setTimeout(() => {
      this.emit("message", {
        user: this.getRandomUser(),
        message: faker.lorem.sentence({ min: 3, max: 10 }),
      });

      this.message();
    }, this.getRandomInterval());
  }

  private getRandomInterval() {
    return Math.floor(Math.random() * MAX_INTERVAL);
  }

  private getRandomUser() {
    return users[Math.floor(Math.random() * users.length)];
  }
}

export default new SDK();
