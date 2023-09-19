function withDraw(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount > 100) {
        reject(new Error("Not enough money to withdraw"));
      }

      resolve(amount);
    }, 1000);
  });
}

function buyCinemaTicket(money) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (money < 10) {
        reject(new Error("You've not enough money to buy ticket"));
      }

      resolve("ticket-1");
    }, 1000);
  });
}

function goToCinema(ticket) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!ticket) {
        reject(new Error("no ticket"));
      }

      resolve("enjoy the movie");
    }, 1000);
  });
}

/*function watchCinema() {
  withDraw(10)
    .then((money) => buyCinemaTicket(money))
    .then((ticket) => goToCinema(ticket))
    .then((result) => console.log(result))
    .catch((err) => console.log(err.message))
}*/

async function watchMovie(amount) {
  try {
    const money = await withDraw(amount);
    const ticket = await buyCinemaTicket(money);
    return await goToCinema(ticket)
  } catch (err) {
    throw err;
  }
}

watchMovie(5)
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message))
